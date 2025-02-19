import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function Quad() {
  const anotherlink = "https://www.w3schools.com/html/mov_bbb.mp4";
  const videoPlayer = useVideoPlayer(anotherlink);
  const [secondPlayerIsReady, setSecondPlayerIsReady] = React.useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSecondPlayerIsReady(true);
    }, 5000);
    return () => clearTimeout(timer);
  });

  return (
    <View style={styles.stepContainer}>
      <VideoView style={styles.video} player={videoPlayer} />
      {secondPlayerIsReady && (
        <VideoView style={styles.video} player={videoPlayer} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  video: {
    height: "50%",
    width: "75%",
  },
  stepContainer: {
    margin: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
