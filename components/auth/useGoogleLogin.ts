import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase/config";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleLogin = () => {
  const [loading, setLoading] = useState(false);

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "bl",
    path: "redirect",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "1044120329015-o3044ve2i0ing55mjjp67ija3dvvvj9p.apps.googleusercontent.com",
    androidClientId: "1044120329015-q6lnvnirtgce41f5g3nugl16r5o6uu72.apps.googleusercontent.com",
    redirectUri,
  });

  useEffect(() => {
    if (!response) return;

    const handleGoogleResponse = async () => {
      if (response.type !== "success") {
        setLoading(false);
        return;
      }

      try {
        const idToken = response.authentication?.idToken;

        if (!idToken) {
          throw new Error("No Google ID token received");
        }

        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, credential);
      } catch (error) {
        console.error("Google Sign-In Error:", error);
        setLoading(false);
      }
    };

    handleGoogleResponse();
  }, [response]);

  const signInWithGoogle = async () => {
    if (!request) return;

    try {
      setLoading(true);
      await promptAsync();
    } catch (error) {
      console.error("Prompt Error:", error);
      setLoading(false);
    }
  };

  return { signInWithGoogle, loading };
};