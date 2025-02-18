import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { createContext, ReactNode, useEffect, useRef } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { createVideoPlayer, VideoPlayer } from "expo-video";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type VideoPlayerRef = React.MutableRefObject<VideoPlayer>;
export const VideoPlayerContext = createContext<VideoPlayerRef>(null as any);

export function PlayerContextProvider({ children }: { children: ReactNode }) {
  const anotherlink = "https://www.w3schools.com/html/mov_bbb.mp4";
  const player = useRef<VideoPlayer>(createVideoPlayer(anotherlink));

  return (
    <VideoPlayerContext.Provider value={player}>
      {children}
    </VideoPlayerContext.Provider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PlayerContextProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PlayerContextProvider>
  );
}
