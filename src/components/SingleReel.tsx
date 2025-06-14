import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
  Pressable,
  Image,
} from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { Asset } from "expo-asset";
import { Ionicons, Feather } from "@expo/vector-icons";
import RocketBlue from "@assets/icons/svg/RocketBlue.svg";
import BrokenHeart from "@assets/icons/svg/BrokenHeart.svg";
import BrokenHeartRed from "@assets/icons/svg/BrokenHeartRed.svg";
import Rocket from "@assets/icons/svg/Rocket.svg";
import Comment from "@assets/icons/svg/Comment.svg";
import Share from "@assets/icons/svg/Share.svg";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

const RocketBlueIcon = React.memo(RocketBlue);
const RocketIcon = React.memo(Rocket);
const BrokenHeartIcon = React.memo(BrokenHeart);
const BrokenHeartRedIcon = React.memo(BrokenHeartRed);
const CommentIcon = React.memo(Comment);
const ShareIcon = React.memo(Share);

type ReelProps = {
  item: {
    video: any;
    postProfile: any;
    title: string;
    description: string;
    likes: number;
  };
  index: number;
  currentIndex: number;
};

const SingleReel: React.FC<ReelProps> = ({ item, index, currentIndex }) => {
  const [mute, setMute] = useState(false);
  const [reaction, setReaction] = useState<null | "like" | "dislike">(null);
  const [iconVisible, setIconVisible] = useState(false);
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get("window").height;
  const videoUri = Asset.fromModule(item.video).uri;



  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    if (!player) return;
    player.muted = mute;
  }, [mute]);

  useEffect(() => {
    if (!player) return;
    if (currentIndex === index) {
      const currentTime = player.currentTime ? player.currentTime : 0;
      player.seekBy(-currentTime);
      player.play();
    } else {
      player.pause();
    }
  }, [currentIndex]);

  const showMuteIcon = () => {
    setIconVisible(true);
    iconOpacity.setValue(0);

    Animated.sequence([
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(iconOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // setIconVisible(false);
    });
  };

  const handleMuteToggle = () => {
    console.log("Muted");
    setMute((prev) => !prev);
    showMuteIcon();
  };

  const lastTap = useRef<number>(0);
  const doubleTapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (doubleTapTimeout.current) clearTimeout(doubleTapTimeout.current);
      handleDoubleTap();
    } else {
      doubleTapTimeout.current = setTimeout(() => {
        handleMuteToggle();
      }, 300);
    }
    lastTap.current = now;
  };

  const handleDoubleTap = () => {
    setReaction((prev) => (prev === "like" ? null : "like"));
    // Optional: show like animation
  };

  const handleLongPress = () => {
    if (player) player.pause();
  };

  const handlePressOut = () => {
    if (player) player.play();
  };

  return (
    <Pressable
      onPress={handleTap}
      onLongPress={handleLongPress}
      onPressOut={handlePressOut}
      delayLongPress={300}
      style={{
        height: windowHeight,
        width: "100%",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <VideoView
        player={player}
        allowsFullscreen={true}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        nativeControls={false}
      />

      {iconVisible && (
        <Animated.View
          style={{
            position: "absolute",
            opacity: iconOpacity,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            padding: 24,
            borderRadius: 40,
          }}
        >
          <Ionicons
            name={mute ? "volume-mute" : "volume-high"}
            size={28}
            color="white"
          />
        </Animated.View>
      )}

      {/* Profile And Coin */}
      <View
        style={{
          // backgroundColor: "red",
          position: "absolute",
          top: 48,
          left: 16,
          flexDirection: "row",
          alignItems: "center",
          columnGap:"4%"
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}
        >
          <Image
            style={{ height: 60, width: 60 }}
            source={require("@assets/icons/user.png")}
          />
          <View>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#FFFFFF" }}>
              shasha_78
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "rgba(255, 255, 255, .7)",
              }}
            >
              Attended the concert last ...more
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(126, 78, 0, 0.75)",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 8,
              padding: 8,
              borderRadius: 20,
            }}
          >
            <Image source={require("@assets/Coin.png")} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: "rgba(247, 162, 25, 1)",
              }}
            >
              1.5K
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Score Button */}

      <View style={{ position: "absolute", bottom: 32, alignSelf: "center" }}>
        <LinearGradient
          colors={["#E8467C", "#BC1948"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 68,
            height: 68,
            borderRadius: 36,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 68,
              height: 68,
              borderRadius: 36,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
              SCORE
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Right-side action buttons */}
      <View
        style={{
          position: "absolute",
          bottom: 60,
          right: 10,
          alignItems: "center",
          rowGap: 20,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setReaction((prev) => (prev === "like" ? null : "like"));
            }}
          >
            {reaction === "like" ? (
              <RocketBlueIcon height={48} width={48} />
            ) : (
              <RocketIcon height={48} width={48} />
            )}
          </TouchableOpacity>
          <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }}>
            50k
          </Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setReaction((prev) => (prev === "dislike" ? null : "dislike"));
            }}
          >
            {reaction === "dislike" ? (
              <BrokenHeartRedIcon height={44} width={44} />
            ) : (
              <BrokenHeartIcon height={44} width={44} />
            )}
          </TouchableOpacity>
          <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }}>
            50k
          </Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity>
            <CommentIcon height={40} width={40} />
          </TouchableOpacity>
          <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }}>
            50k
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 8,
          }}
        >
          <TouchableOpacity>
            <ShareIcon height={28} width={28} />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity>
            <Feather name="more-vertical" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default SingleReel;
