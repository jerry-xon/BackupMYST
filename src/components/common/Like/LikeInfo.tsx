import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { spacing } from 'src/constants';
import { colors } from 'src/themes/colors';
import { fontFamily } from 'src/themes/typography';

interface LikeInfoProps {
  onPress: () => void;
  nameOfuser: string;
  avatars: string[];
  status :"Liked"|"Followed",
  style?:StyleProp<ViewStyle>,
  count?:number,
  textSytle?:StyleProp<TextStyle>
}

const LikeInfo: React.FC<LikeInfoProps> = ({
  onPress,
  nameOfuser,
  avatars,
  ...props
}) => {
  return (
    <Pressable style={[styles.container, props?.style]} onPress={onPress}>
      <View style={styles.avatarContainer}>
        {avatars.slice(0, 3).map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={[
              styles.avatar,
              { left: index * 16, zIndex: avatars.length - index },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.text,props?.textSytle]}>
        {props.status} by <Text style={styles.bold}>{nameOfuser}</Text> and{' '}
        <Text style={styles.bold}>{props?.count} others</Text>
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:spacing.xs
  },
  avatarContainer: {
    flexDirection: 'row',
    marginRight: 8,
    position: 'relative',
    width: 60,
    height: 32,
    alignSelf:"center",
    alignItems:"center"
  },
  avatar: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontFamily:fontFamily.medium
  },
  bold: {
    fontFamily:fontFamily.bold
  },
});

export default LikeInfo;
