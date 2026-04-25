import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { styles } from "./styles/successScreen.style";
import { syncUserWithFirestore } from "../../firebase/user/user";
import { useUserStore } from "../../store/store";

export const SuccessScreen: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const setUserData = useUserStore((state) => state.setUserData);

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isReady, setIsReady] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  // ===== GET FIREBASE USER =====
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // ===== SYNC USER =====
  const hasSynced = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (hasSynced.current || !user) return;
      hasSynced.current = true;

      const [userData] = await Promise.all([
        syncUserWithFirestore(user),
        new Promise<void>((resolve) => setTimeout(resolve, 5000)),
      ]);

      if (!cancelled) {
        if (userData) setUserData(userData);
        setIsReady(true);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // ===== REDIRECT =====
  useEffect(() => {
    if (!isReady) return;
    const timer = setTimeout(() => router.replace("/(home)/home"), 500);
    return () => clearTimeout(timer);
  }, [isReady]);

  // ===== ENTRY ANIMATION =====
  useEffect(() => {
    const entryAnim = Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    const rotateLoop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    );

    entryAnim.start();
    rotateLoop.start();

    return () => {
      entryAnim.stop();
      rotateLoop.stop();
    };
  }, []);

  // ===== PROGRESS BAR =====
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: isReady ? 1 : 0.9,
      duration: isReady ? 300 : 1800,
      useNativeDriver: false,
    }).start();
  }, [isReady]);

  // ===== INTERPOLATIONS =====
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.glowOuter}>
        <View style={styles.glowInner} />
      </View>

      <Animated.View
        style={[
          styles.card,
          { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.loaderWrapper}>
          <Animated.View
            style={[styles.spinnerRing, { transform: [{ rotate: spin }] }]}
          />
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
        </View>

        <Animated.View >
          <Text style={styles.successTitle}>Verified!</Text>

        </Animated.View>

        {/* <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View> */}

        <Text style={styles.redirectText}>
          {isReady ? "Taking you home..." : "Setting up your account..."}
        </Text>
      </Animated.View>
    </View>
  );
};