import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HEADER_HEIGHT, spacing } from 'src/constants'
import { colors } from 'src/themes/colors'
import DropDown from '@assets/icons/svg/DropDown.svg';
import { fontFamily } from 'src/themes/typography'

interface UploadMediaHeaderProps {
  leftChidlren?: React.ReactNode;
  rightChidlren?: React.ReactNode;
  showDropDown?:boolean
  title?:string
}


const UploadMediaHeader = (Props: UploadMediaHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.first}>
          {Props?.leftChidlren && Props.leftChidlren}
        </View>
        <View style={styles.center}>
          <Text style={styles.centertitle}>{Props?.title}</Text>
            <Pressable style={{ marginLeft: 5 }}>
          {Props?.showDropDown && (
              <DropDown />
            )}
            </Pressable>
        </View>

        <View style={styles.third}>
          {Props?.rightChidlren && Props.rightChidlren}
        </View>
      </View>
    </View>
  );
};

export default UploadMediaHeader

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    width: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    paddingBottom: spacing.sm + 4,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  first: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height:40
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleStyle: {
    fontSize: 11,
  },
  third: {
    minWidth:"10%"
  },
  centertitle: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    lineHeight: 24,
    letterSpacing: 1,
    marginLeft:20
  },
});