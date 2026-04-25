import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import TopNavBar from "./topNavbar";
import ShopHeader from "./shopHeader";
import StatsBar from "./statesBar";
import HighlightStrip from "./highlightStrip";
import ContentTabBar from "./contentTapBar";
import PhotoGrid from "./photoGrid";
import ReelsGrid from "./reelsGrid";

import { shopData, photosData, reelsData } from "./mockData";
import { ActiveTab, Photo, Reel } from "../../../types/shop/shopSocial";
type RootStackParamList = {
  Shop: undefined;
  PhotoDetail: { photo: Photo };
  ReelPlayer: { reel: Reel };
};

interface Props {
  navigation?: NativeStackNavigationProp<RootStackParamList, "Shop">;
}

const IndexShopPostScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  const handlePhotoPress = (photo: Photo) => {
    navigation?.navigate("PhotoDetail", { photo });
  };

  const handleReelPress = (reel: Reel) => {
    navigation?.navigate("ReelPlayer", { reel });
  };

  return (
    <>
      <TopNavBar
        username={shopData.username}
        onBack={() => navigation?.goBack()}
        onOptions={() => console.log("Options")}
      />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 400 }} // ← only real padding needed
        stickyHeaderIndices={[3]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#e91e8c"
          />
        }
      >
        {/* 0 */}
        <ShopHeader shop={shopData}  posts={shopData.stats.posts}
          followers={shopData.stats.followers}
          following={shopData.stats.following}
          onFollowersPress={() => console.log("Followers")}
          onFollowingPress={() => console.log("Following")} />

        {/* 1 */}
        {/* <StatsBar
          posts={shopData.stats.posts}
          followers={shopData.stats.followers}
          following={shopData.stats.following}
          onFollowersPress={() => console.log("Followers")}
          onFollowingPress={() => console.log("Following")}
        /> */}

        {/* 2 */}
        {/* <HighlightStrip highlights={shopData.highlights} /> */}

        {/* 3 — sticky */}
        <ContentTabBar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 4 */}
        <View>
          {activeTab === "posts" ? (
            <PhotoGrid photos={photosData} onPress={handlePhotoPress} />
          ) : (
            <ReelsGrid reels={reelsData} onPress={handleReelPress} />
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scroll: { flex: 1.4, backgroundColor: "#fff", paddingBottom: 900 },
});

export default IndexShopPostScreen;
