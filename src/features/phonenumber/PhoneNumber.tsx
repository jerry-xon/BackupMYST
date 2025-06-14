import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import auth from "@react-native-firebase/auth";

type PhoneNumberNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HeadingText = () => {
  return (
    <View style={{ justifyContent: "center", top: 160 }}>
      <Text style={{ fontSize: 56, fontWeight: "800", color: "#FFFFFF" }}>
        MYST
      </Text>
      <Text style={{ fontSize: 22, fontWeight: "400", color: "#FFFFFF" }}>
        Monetize your screen time ⏳{" "}
      </Text>
      <View style={{ top: 52 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#FFFFFF" }}>
          Login/Sign up
        </Text>
      </View>
    </View>
  );
};

const NumberInput = ({
  countryCode,
  callingCode,
  setCountryCode,
  setCallingCode,
  phoneNumber,
  setPhoneNumber,
  showPicker,
  setShowPicker,
}: {
  countryCode: CountryCode;
  callingCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<CountryCode>>;
  setCallingCode: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  showPicker: boolean;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setShowPicker(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.dropdown} onPress={() => setShowPicker(true)}>
          <Text style={styles.countryCode}>+{callingCode}</Text>
          <AntDesign name="down" size={16} color="#00F9FF" />
        </Pressable>

        <View
          style={{
            height: 52,
            backgroundColor: "rgba(255,255,255,0.2)",
            width: 1,
          }}
        ></View>

        <TextInput
          style={styles.input}
          placeholder="Mobile number"
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <CountryPicker
          {...{
            countryCode,
            withCallingCode: true,
            withFilter: true,
            withFlag: true,
            withEmoji: false,
            onSelect,
          }}
          visible={showPicker}
          onClose={() => setShowPicker(false)}
          containerButtonStyle={{ display: "none" }}
        />
      </View>
    </>
  );
};

const InviteCode = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        columnGap: 8,
        top: 496,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        Invited by a Friend?
      </Text>
      <TouchableOpacity>
        <Text
          style={{
            textDecorationLine: "underline",
            fontWeight: "700",
            fontSize: 16,
            color: "#FFFFFF",
          }}
        >
          Enter a Code
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ContinueButton = ({
  onContinue,
  isLoading,
}: {
  onContinue: () => void;
  isLoading: boolean;
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", top: 268 }}>
      <LinearGradient
        colors={["#E8467C", "#BC1948"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}
      >
        <TouchableOpacity
          onPress={onContinue}
          style={{ paddingVertical: 12, paddingHorizontal: 120, width: "100%" }}
          disabled={isLoading}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}>
            {isLoading ? "SENDING..." : "CONTINUE"}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};


const PhoneNumber = () => {
  const navigation = useNavigation<PhoneNumberNavigationProp>();
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onContinue = async () => {
    navigation.navigate('OTP')
    // const fullPhoneNumber = `+${callingCode}${phoneNumber.replace(/\D/g, "")}`;
    // if (!phoneNumber || !/^\+\d{10,15}$/.test(fullPhoneNumber)) {
    //   Alert.alert(
    //     "Invalid phone number",
    //     "Please enter a valid phone number in international format."
    //   );
    //   return;
    // }

    // setIsLoading(true);
    // try {
    //   const confirmation = await auth.signInWithPhoneNumber(fullPhoneNumber);
    //   setIsLoading(false);
    //   navigation.navigate("OTP", { confirm: confirmation });
    // } catch (error: any) {
    //   setIsLoading(false);
    //   console.error("Error sending code:", error);
    //   Alert.alert("OTP Error", error.message || "Failed to send verification code.");
    // }
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("@assets/PhoneNumberbg.png")}
    >
      <SafeAreaProvider>
        <SafeAreaView style={{ paddingHorizontal: 20 }}>
          <HeadingText />
          <NumberInput
            countryCode={countryCode}
            callingCode={callingCode}
            setCountryCode={setCountryCode}
            setCallingCode={setCallingCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
          />
          <ContinueButton onContinue={onContinue} isLoading={isLoading} /> 
          <InviteCode />
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
};

export default PhoneNumber;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    paddingHorizontal: 12,
    alignItems: "center",
    top: 240,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
    justifyContent: "center",
    columnGap: 8,
  },
  countryCode: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  input: {
    paddingLeft: 12,
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
  },
  gradientBorder: {
    borderRadius: 20,
  },
});
