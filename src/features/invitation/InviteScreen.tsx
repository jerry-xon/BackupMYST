import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppBackgroundLayer from "src/components/common/AppBackgroundLayer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { BaseText } from "src/components/BaseText";
import { fontFamily } from "src/themes/typography";

const HeadAndValue = () => {
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          columnGap: 12,
        }}
      >
        <MaterialIcons name="bolt" size={28} color="#E8467C" />

        <Text style={{ color: "#BC1948", fontWeight: "700", fontSize: 18 }}>
          EASY EARN
        </Text>
        <MaterialIcons name="bolt" size={28} color="#E8467C" />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 16,
        }}
      >
        <BaseText color="#0ED2F7" variant="heading3">
          1 Invite = 100 Coins
        </BaseText>
        <BaseText color="#0ED2F7" variant="heading2">
          2 Invite = 200 Coins
        </BaseText>
        <BaseText color="#0ED2F7" variant="heading1">
          10 Invite = 1000 Coins
        </BaseText>
      </View>
    </View>
  );
};

const TopInviters = () => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 20 }}
    >
      <LinearGradient
        colors={["#E8467C", "#BC1948"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <View
          style={{
            backgroundColor: "rgba(232, 70, 124, .5)",
            height: 300,
            width: "100%",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#0ED2F7",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                bottom: 60,
              }}
            >
              <BaseText color="#0ED2F7" variant="heading2">
                TOP INVITERS
              </BaseText>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                columnGap: 20,
                bottom: 24,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{
                    borderRadius: 40,
                    height: 60,
                    width: 60,
                    borderWidth: 3,
                    borderColor: "#0ED2F7",
                  }}
                  source={require("@assets/profile.png")}
                />
                <View
                  style={{
                    backgroundColor: "#0ED2F7",
                    borderRadius: 20,
                    width: 40,
                    alignItems: "center",
                    // left: 11,
                    bottom: 16,
                    justifyContent: "center",
                  }}
                >
                  <BaseText color="#000000" variant="heading3">
                    2
                  </BaseText>
                </View>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    columnGap: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: "#0ED2F7",
                    }}
                  >
                    92,000
                  </Text>
                  <Image source={require("@assets/Coin.png")} />
                </View>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    borderWidth: 3,
                    borderColor: "#0ED2F7",
                  }}
                  source={require("@assets/profile.png")}
                />
                <View
                  style={{
                    backgroundColor: "#0ED2F7",
                    borderRadius: 20,
                    width: 40,
                    alignItems: "center",
                    // left: 20,
                    bottom: 16,
                  }}
                >
                  <BaseText color="#000000" variant="heading1">
                    1
                  </BaseText>
                </View>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    columnGap: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#0ED2F7",
                    }}
                  >
                    1,12,000
                  </Text>
                  <Image source={require("@assets/Coin.png")} />
                </View>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{
                    borderRadius: 40,
                    height: 60,
                    width: 60,
                    borderWidth: 3,
                    borderColor: "#0ED2F7",
                  }}
                  source={require("@assets/profile.png")}
                />
                <View
                  style={{
                    backgroundColor: "#0ED2F7",
                    borderRadius: 20,
                    width: 40,
                    alignItems: "center",
                    // left: 11,
                    bottom: 16,
                  }}
                >
                  <BaseText color="#000000" variant="heading3">
                    3
                  </BaseText>
                </View>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    columnGap: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: "#0ED2F7",
                    }}
                  >
                    86,000
                  </Text>
                  <Image source={require("@assets/Coin.png")} />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "#0ED2F7",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 60,
              paddingVertical: 12,
              borderRadius: 16,
              top: 16,
              columnGap: 12,
            }}
          >
            <Image source={require("@assets/Coin.png")} />
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              Current Balance : 0
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const CopyCode = () => {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: "#0ED2F7",
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        top:40
      }}
    >
      <View style={{rowGap:8}}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#0ED2F7",
          }}
        >
          REFERRAL CODE
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#0ED2F7" }}>
          cv68ij
        </Text>
      </View>
      <View>
         <TouchableOpacity
        style={{
          backgroundColor: "#0ED2F7",
          padding: 4,
          borderRadius: 16,
          paddingHorizontal: 12,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 18 }}>Copy</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};


const ReferralButton = () =>{
  return(
<View style={{paddingTop:80}}>
  <TouchableOpacity style={{backgroundColor:"#0ED2F7",paddingHorizontal:80,paddingVertical:12,borderRadius:16,top:24}}>
    <Text style={{fontSize:20,fontWeight:"700",}}>
      Refer & Earn Instanly
    </Text>
  </TouchableOpacity>
</View>
  )
}

const InviteScreen = () => {
  return (
    <AppBackgroundLayer>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={{ paddingHorizontal: 16 }}>
            <HeadAndValue />
            <TopInviters />
            <CopyCode />
            <ReferralButton />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </AppBackgroundLayer>
  );
};

export default InviteScreen;

const styles = StyleSheet.create({
  gradientBorder: {
    height: 300,
    width: "100%",
    borderRadius: 20,
  },
});
