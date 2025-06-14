import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

const images = [
  require("@assets/Rectangle1.png"),
  require("@assets/Rectangle2.png"),
  require("@assets/Rectangle3.png"),
];

const Poster = () => {
  const scale1 = useSharedValue(0.1);
  const scale2 = useSharedValue(0.1);
  const scale3 = useSharedValue(0.1);
  useEffect(() => {
    scale1.value = withTiming(1, { duration: 700 });
    setTimeout(() => (scale2.value = withTiming(1, { duration: 700 })), 200);
    setTimeout(() => (scale3.value = withTiming(1, { duration: 700 })), 400);
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
  }));
  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
  }));
  return (
    <View style={styles.container}>
      <Animated.Image
        source={images[0]}
        style={[styles.Leftimage, animatedStyle1]}
      />
      <Animated.Image
        source={images[1]}
        style={[styles.Middleimage, animatedStyle2]}
      />
      <Animated.Image
        source={images[2]}
        style={[styles.Rightimage, animatedStyle3]}
      />
    </View>
  );
};

const SwipeLikeText = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 136,
      }}
    >
      <View>
        <Text style={{ color: "#FFFFFF", fontSize: 54, fontWeight: "800" }}>
          SWIPE LIKE
        </Text>
        <Image
          style={{ position: "absolute", top: 32, width: "80%" }}
          source={require("@assets/neverbefore.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 56,
          columnGap: 8,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          Play, Predict, Profit. Only on
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "rgba(255, 255, 255, 1)",
          }}
        >
          MYST.
        </Text>
      </View>
    </View>
  );
};
type LoginSignupButtonProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const LoginSignupButton = ({ navigation }: LoginSignupButtonProps) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        columnGap: 16,
        paddingTop: 44,
      }}
    >
      <LinearGradient
        colors={["#E8467C", "#BC1948"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('PhoneNumber')}
          activeOpacity={0.7}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 56,
            backgroundColor: "#1e124c",
            borderRadius: 20,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 14, color: "#FFFFFF" }}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={["#E8467C", "#BC1948"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 0 }}
        style={styles.gradientBorder}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 56,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 14, color: "#FFFFFF" }}>
            SIGN UP
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default function LoginSignup() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("@assets/Splashbg2.png")}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Poster />
          <SwipeLikeText />
          <LoginSignupButton navigation={navigation} />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 20,
    top: 20,
  },
  Leftimage: {
    resizeMode: "cover",
    top: 88,
    borderRadius:12
  },
  Middleimage: {
    resizeMode: "cover",
    borderRadius:12
  },
  Rightimage: {
    resizeMode: "cover",
    top: 56,
    borderRadius:12
  },
  gradientBorder: {
    padding: 2,
    borderRadius: 20,
    
  },
});
