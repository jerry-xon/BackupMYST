import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import AppBackgroundLayer from "src/components/common/AppBackgroundLayer";
import { colors } from "src/themes/colors";
import { fontFamily } from "src/themes/typography";
import Coin from "@assets/icons/svg/Coin.svg";
import amazon from "@assets/icons/svg/amazon.svg";
import Ajio from "@assets/icons/svg/Ajio.svg";
import myntra from "@assets/icons/svg/myntra.svg";
import flipkart from "@assets/icons/svg/flipkart.svg";
import Meeshow from "@assets/icons/svg/Meeshow.svg";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import Clip from "@assets/icons/svg/Clip.svg";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 12;
const CARD_WIDTH = width - CARD_MARGIN * 2;

const slides = [
  {
    id: "1",
    title: "FLAT 20% OFF",
    code: "WELCOMEBACK20",
    image: require("@assets/iPhone.png"), // Replace with your image
  },
  {
    id: "2",
    title: "EXTRA 15% OFF",
    code: "HELLO15",
    image: require("@assets/iPhone.png"),
  },
  {
    id: "3",
    title: "EXTRA 15% OFF",
    code: "HELLO15",
    image: require("@assets/iPhone.png"),
  },
];

const Brands = [
  {
    id: 1,
    name: "Amazon",
    logo: amazon,
  },
  {
    id: 2,
    name: "Myntra",
    logo: myntra,
  },
  {
    id: 3,
    name: "Flipkart",
    logo: flipkart,
  },
  {
    id: 4,
    name: "Meesho",
    logo: Meeshow,
  },
  {
    id: 5,
    name: "Ajio",
    logo: Ajio,
  },
  {
    id: 6,
    name: "Amazon",
    logo: amazon,
  },
  {
    id: 7,
    name: "Myntra",
    logo: myntra,
  },
  {
    id: 8,
    name: "Flipkart",
    logo: flipkart,
  },
  {
    id: 9,
    name: "Meesho",
    logo: Meeshow,
  },
  {
    id: 10,
    name: "Ajio",
    logo: Ajio,
  },
];

const AutoScrollCarousel = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % slides.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / width);
    setIndex(newIndex);
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Cashback available offers</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
      >
        {slides.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.codeText}>Use Code:</Text>
            <Text style={styles.code}>{item.code}</Text>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, index === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};
const Heading = () => {
  return (
    <View style={styles.HeadingTextContainer}>
      <Text style={styles.Heading}>MY WALLET</Text>
    </View>
  );
};

const CoinsDisplay = () => {
  return (
    <View style={styles.CoinDisplayContainer}>
      {/* Total Coins */}
      <View style={styles.TotalCoinsDisplayContainer}>
        <View>
          <Text style={styles.TotalCoinsText}>Total Coins</Text>
        </View>
        <View style={styles.CoinsTextAndIconContainer}>
          <Coin />
          <Text style={styles.CoinsText}>5900</Text>
        </View>
      </View>
      {/* Redeemed & Today's earned Coins */}
      <View style={styles.RedeemedAndTodayEarnedCoinsContainer}>
        <View style={styles.RedeemedCoinsContainer}>
          <View style={styles.RedeemedCoinsTextAndTotalCoinsContainer}>
            <Text style={styles.RedeemedText}>Redeemed Coins</Text>
            <View style={styles.TotalRedeemedCoinsTextAndCoinIcon}>
              <Coin />
              <Text style={styles.TotalRedeemedCoinsText}>400</Text>
            </View>
          </View>
        </View>
        <View style={styles.RedeemedCoinsContainer}>
          <View style={styles.RedeemedCoinsTextAndTotalCoinsContainer}>
            <Text style={styles.RedeemedText}>Today’s earned coins</Text>
            <View style={styles.TotalRedeemedCoinsTextAndCoinIcon}>
              <Coin />
              <Text style={styles.TotalRedeemedCoinsText}>250</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const RedeemNow = () => {
  return (
    <View style={styles.RedeemNowContainer}>
      <View>
        <Text style={styles.RedeemNowText}>Redeem Now</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Brands.map((brand, i) => (
          <View key={i} style={styles.BrandLogoContainer}>
            <View>
              <TouchableOpacity style={styles.LogoButton}>
                <brand.logo width={38} height={38} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.BrandName}>{brand.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View></View>
    </View>
  );
};

const ProductLinkInput = () => {
  const [productLink, setProductLink] = useState("");

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <LinearGradient
        colors={["#B2FEFA", "#0ED2F7"]}
        style={styles.gradientBorder}
      >
        <View style={styles.container}>
          <Clip width={20} height={20} style={{ marginRight: 8 }} />

          <View style={{ flex: 1, rowGap: 4 }}>
            <Text style={styles.label}>Product Link</Text>
            <TextInput
              value={productLink}
              onChangeText={setProductLink}
              placeholder="Paste product link here"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.redeemButton}>
            <Text style={styles.redeemText}>REDEEM</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const TransactionHistory = () => {
  return (
    <View>
      <View>
        <Text
          style={{
            color: colors.white,
            fontFamily: fontFamily.bold,
            fontSize: 16,
          }}
        >
          Transaction history
        </Text>
      </View>
    </View>
  );
};

const Wallet = () => {
  return (
    <AppBackgroundLayer>
      <StatusBar barStyle={"light-content"} />
      <View style={{ top: 20 }}>
        <Heading />
        <CoinsDisplay />
        <AutoScrollCarousel />
        <RedeemNow />
        <ProductLinkInput />
        <TransactionHistory />
      </View>
    </AppBackgroundLayer>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  HeadingTextContainer: {
    justifyContent: "center",
    paddingTop: 40,
    alignItems: "center",
  },
  Heading: {
    color: colors.white,
    fontFamily: fontFamily.black,
    fontSize: 18,
  },
  CoinsText: {
    fontFamily: fontFamily.bold,
    color: colors.white,
    fontSize: 34,
    top: 2,
  },
  CoinsTextAndIconContainer: {
    flexDirection: "row",
    columnGap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  CoinDisplayContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    rowGap: 8,
  },
  TotalCoinsText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
  TotalCoinsDisplayContainer: {
    backgroundColor: "rgba(247, 162, 25, 0.5)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 116,
  },
  RedeemedAndTodayEarnedCoinsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  RedeemedCoinsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 16,
    paddingRight: 32,
    paddingLeft: 12,
    borderRadius: 8,
  },
  RedeemedCoinsTextAndTotalCoinsContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 4,
  },
  RedeemedText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.white,
  },
  TotalRedeemedCoinsText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    color: colors.white,
  },
  TotalRedeemedCoinsTextAndCoinIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  //   At this point Carousel starts
  sectionTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.white,
    paddingLeft: 16,
    paddingBottom: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#EA4C89",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: CARD_MARGIN,
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    fontFamily: fontFamily.extraBold,
    color: colors.white,
  },
  codeText: {
    color: colors.white,
    paddingTop: 12,
    fontFamily: fontFamily.regular,
    fontSize: 12,
  },
  code: {
    fontSize: 16,
    fontFamily: fontFamily.extraBoldItalic,
    color: colors.white,
  },
  image: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 12,
    borderRadius: 4,
    backgroundColor: "#888",
    margin: 4,
  },
  activeDot: {
    width: 32,
    backgroundColor: "rgba(14, 210, 247, 1)",
  },
  RedeemNowText: {
    fontFamily: fontFamily.bold,
    color: colors.white,
    fontSize: 16,
  },
  RedeemNowContainer: {
    rowGap: 12,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  BrandLogoContainer: {
    rowGap: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
  },
  LogoButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    height: 56,
    width: 56,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  BrandName: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    fontFamily: fontFamily.medium,
  },
  //   At this point Textinput starts
  gradientBorder: {
    padding: 2,
    borderRadius: 16,
  },
  container: {
    backgroundColor: "#0D0B29",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  label: {
    color: colors.white,
    fontSize: 10,
    fontFamily: fontFamily.medium,
  },
  input: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
  },
  redeemButton: {
    backgroundColor: "#FF3570",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  redeemText: {
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
  },
});
