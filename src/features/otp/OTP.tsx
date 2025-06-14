import React from 'react';
import { View, StyleSheet ,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AppBackgroundLayer from 'src/components/common/AppBackgroundLayer';
import Myst from '@assets/icons/svg/Myst.svg';
import { spacing } from '../../constants';
import { colors } from 'src/themes/colors';
import { fontFamily } from 'src/themes/typography';
import OTPInput from 'src/components/OTPInput';
import RNButton from 'src/components/common/RNButton';
import Animated, { FadeIn, FadeInDown, FadeInLeft } from 'react-native-reanimated';

type OTPNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTP'>;

const OTP = () => {

  const [otp , setOtp] = React.useState<string>('');
  const navigation = useNavigation<OTPNavigationProp>();

    const onVerify = ()=>{
      navigation.navigate("OnboardProfile",{userId:""})
    }

  //   const user = result.user;
  //    navigation.navigate('OnboardProfile', {userId:user.uid});
    
  //   const idToken = await user.getIdToken();
  //   console.log(idToken);

    
  //   const res = await fetch('https://myst-backend-na0j.onrender.com/api/v1/auth/verify-otp', {   //This comment is for kaushal
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${idToken}`,
  //     },
  //     body: JSON.stringify({ phone: user.phoneNumber }),
  //   });

  //   const data = await res.json();

    
  //   if (data.exists) {
  //     navigation.navigate('OnboardProfile', { userId: user.uid });
  //   } else {
  //     navigation.navigate('OnboardProfile', { userId: user.uid });
  //   }

  // } catch (error: any) {
  //   console.log('OTP verification error:', error);
  //   Alert.alert('Verification failed', error.message || 'Invalid OTP');
  // } finally {
  //   setIsLoading(false);
  // }

  return (
    <AppBackgroundLayer scroll={true} arc={true} dots={true}>
      <View style={styles.container}>
        <View style={styles.splitContainers}>
          <View style={styles.section}>
            <Animated.View entering={FadeInDown.delay(100)}>
              <Myst />
            </Animated.View>
            <Animated.Text
              entering={FadeInDown.delay(150)}
              style={styles.titleDescription}
            >
              Monetize your screen time ⏳{' '}
            </Animated.Text>

            <Animated.Text
              style={styles.otpTitle}
              entering={FadeInDown.delay(250)}
            >
              Verify Phone number
            </Animated.Text>
            <Animated.Text
              style={styles.OtpDescription}
              entering={FadeInDown.delay(300)}
            >
              OTP has been shared to +91-8981967435
            </Animated.Text>

            <OTPInput onChangeOTP={(e) => setOtp(e)} length={6} />

            <View style={styles.buttonSection}>
              <RNButton
                key={'back'}
                mainContainer={{ flex: 1 }}
                active={false}
                title="BACK"
                onPress={() => {
                  console.log('sdfgds');
                }}
              />
              <RNButton
                key={'verfify'}
                deactived={otp.length !== 6}
                mainContainer={{ flex: 1 }}
                active={true}
                title="VERIFY"
                onPress={onVerify}
              />
            </View>
          </View>

          <Animated.View entering={FadeInDown.delay(400)} style={styles.resendSection}>
            <Text style={styles.resendText}>
              Didn’t receive the code?{' '}
              <Text
                style={styles.resendLink}
                onPress={() => console.log('Resend Code')}
              >
                Resend Code
              </Text>
            </Text>
          </Animated.View>
        </View>
      </View>
    </AppBackgroundLayer>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 242,
    paddingHorizontal: spacing.lg,
  },
  splitContainers: {
    flex: 1,
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
  },

  titleDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    lineHeight: 18 * 1.9,
    textTransform: 'capitalize',
    color: colors.lightWhite,
    letterSpacing: 0.5,
  },
  otpTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 24 * 1.6,
    letterSpacing: 0,
    color: colors.white,
    marginTop: 59,
  },
  OtpDescription: {
    fontFamily: fontFamily.light,
    fontSize: 14,
    lineHeight: 14 * 1.6,
    letterSpacing: 0,
    color: '#FFFFFF',
  },
  buttonSection: {
    marginTop: 32,
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  resendSection: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 40,
    alignItems:"center"
  },
  resendText: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.lightWhite,
  },
  resendLink: {
    fontFamily: fontFamily.semiBold,
    color: colors.white,
    textDecorationLine: 'underline',
  },
});
