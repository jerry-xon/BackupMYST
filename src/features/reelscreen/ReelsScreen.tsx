import React from "react";
import { View, Dimensions, Text } from "react-native";
import { ReelsComponent } from "../../components/ReelsComponent";

export const ReelsScreen = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ width, height, backgroundColor: "black" }}>
      <ReelsComponent />
    </View>
  );
};
