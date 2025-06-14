import { Image, ImageProps, ImagePropsAndroid, ImagePropsIOS, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import PlusCircelIcon  from "@assets/icons/svg/PlusCircleIcon"
import Edit from '@assets/icons/svg/Edit.svg';
import { colors } from 'src/themes/colors';
import RNButton from './RNButton';
import { fontFamily } from 'src/themes/typography';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


const IMAGE_HEIGHT = 120

type ImageIOSAndAndroid =  ImagePropsIOS & ImagePropsAndroid & ImageProps

interface UserImageProps extends ImageIOSAndAndroid {
  key?: string;
  onChangeImage?:(e:string)=>void,
  action?: 'None' | 'Edit' | 'Add',
  gradientStatus?:  'None'| 'Blue' | 'Red' ,
  heigth?:number,
  title?:string,
  onPress?:()=>void
}

const UserImage = (Props:UserImageProps) => {

  const scale = useSharedValue(1);
    const  {action = 'None',gradientStatus = 'Blue' ,...props} = Props
    const height = Props.height ? Props.height :   IMAGE_HEIGHT

    const onPress = ()=>{
        if(Props.onChangeImage !== undefined) {
            Props.onChangeImage("")
        }
    }

    const onPressImage = ()=> {
      if (Props.onPress !== undefined) {
        Props.onPress();
      }
    }


    const color =
    (  Props.gradientStatus === 'None' || Props.gradientStatus === undefined)
        ? ['white', 'white']
        : Props.gradientStatus === 'Blue'
        ? colors.linearGradient.activeInputBox
        : colors.linearGradient.pinkGradient;

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }, 
            ],
          }));
  
  
  return (
    <Animated.View
      style={[
        {
          borderRadius: Props.height,
        },
        animatedStyle,
      ]}
    >
      <View
        style={{
          borderRadius: Props.height,
          position: 'relative',
          height,
          width: height,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {Props.gradientStatus !== undefined &&
          Props.gradientStatus !== 'None' && (
            <LinearGradient
              colors={color as [string, string]}
              style={StyleSheet.absoluteFillObject}
            />
          )}
        <Pressable
          onPressIn={() => {
            scale.value = withSpring(0.8);
          }}
          onPressOut={() => {
            scale.value = withSpring(1);
          }}
          style={[
            {
              height: height * 0.95,
              width: height * 0.95,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={onPressImage}
        >
          <Image
            style={[
              {
                height: '100%',
                width: '100%',
                borderRadius: height / 2,
              },
            ]}
            resizeMode="contain"
            {...Props}
          />
        </Pressable>
      </View>
      <TouchableOpacity style={styles.plusIconContainer}>
        {action === 'Add' && (
          <PlusCircelIcon
            height={height ? height / 3 : 30}
            width={height ? height / 3 : 30}
          />
        )}
        {action === 'Edit' && (
          <RNButton
            titleAsChildren={
              <Edit
                height={height ? height / 8 : 30}
                width={height ? height / 8 : 30}
              />
            }
            gradientcolors={colors.linearGradient.activeInputBox}
            gradientStyle={{
              height: height ? height / 3 : 30,
              width: height ? height / 3 : 30,
            }}
            onPress={onPress}
          />
        )}
      </TouchableOpacity>
      {Props.title && <Text style={styles.nameOfImage}>{Props.title}</Text>}
    </Animated.View>
  );
}

export default UserImage

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  imageContianer: {
    overflow: 'hidden',
  },
  image: {},
  gradient: {
    position: 'absolute',
  },
  plusIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  editIcon: {
    height: 35,
    width: 35,
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  gradientStyles: {
    height: 35,
    width: 35,
    justifyContent: 'center',
  },
  nameOfImage:{
    fontSize:12,
    fontFamily:fontFamily.regular,
    color:colors.lightWhite,
    textAlign:"center",marginVertical:5
  }
});