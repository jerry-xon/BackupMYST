import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppBackgroundLayer from 'src/components/common/AppBackgroundLayer'
import UserImage from 'src/components/common/UserImage'
import { fontFamily } from 'src/themes/typography'
import { colors } from 'src/themes/colors'
import { spacing } from 'src/constants'

import LinkedIn from "@assets/icons/svg/Linekdin.svg"
import X from '@assets/icons/svg/x.svg';
import Instagram from '@assets/icons/svg/instagram.svg';
import Reddit from '@assets/icons/svg/redditsvg.svg';
import Tiktok from '@assets/icons/svg/tiktok.svg';
import LikeInfo from 'src/components/common/Like/LikeInfo'
import RNButton from 'src/components/common/RNButton'
import ProfileMedia from './ProfileMedia'


const Profile = () => {

  const topView = React.useCallback(()=>{
    return (
      <View>
        <View style={styles.profileContainer}>
          <UserImage
            source={require('@assets/icons/user.png')}
            height={125}
            gradientStatus="Red"
          />
        </View>

        <Text style={styles.name}>John Dow</Text>
        <Text style={styles.designation}>Desginer</Text>

        <View style={styles.row}>
          <View>
            <Text style={[styles.boldText]}>4,567</Text>
            <Text style={[styles.regularText]}>Posts</Text>
          </View>
          <View>
            <Text style={[styles.boldText]}>4,567</Text>
            <Text style={[styles.regularText]}>Followers</Text>
          </View>
          <View>
            <Text style={[styles.boldText]}>4,567</Text>
            <Text style={[styles.regularText]}>Following</Text>
          </View>
          <View>
            <Text style={[styles.boldText]}>4,567</Text>
            <Text style={[styles.regularText]}>Rockets</Text>
          </View>
        </View>

        <View style={[styles.row, { gap: 24 }]}>
          <LinkedIn />
          <X />
          <Instagram />
          <Reddit />
          <Tiktok />
        </View>
        <Text style={[styles.regularText, { fontSize: 14, width: '95%' }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt #hashtag
        </Text>
        <LikeInfo
          status="Followed"
          nameOfuser="saradoe_123"
          avatars={[
            'https://randomuser.me/api/portraits/women/1.jpg',
            'https://randomuser.me/api/portraits/men/2.jpg',
            'https://randomuser.me/api/portraits/women/3.jpg',
          ]}
          onPress={() => {}}
          style={{
            alignSelf: 'center',
            width: '65%',
            marginVertical: spacing.md,
          }}
          textSytle={{ width: '90%' }}
          count={120}
        />
        <RNButton
          title="Follow"
          active={true}
          mainContainer={styles.mainContainer}
        />
      </View>
    );
  },[])

  return (
    <AppBackgroundLayer avoidKeyboardScroll={true} scroll={false}>
      <View style={styles.conatiner}>
        <ProfileMedia headerComponent={topView()} />
      </View>
    </AppBackgroundLayer>
  );
}

export default Profile

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  profileContainer: {
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: fontFamily.bold,
    color: colors.white,
    textAlign: 'center',
    alignSelf: 'center',
    letterSpacing: 0.4,
  },
  designation: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: fontFamily.semiBold,
    color: colors.white,
    textAlign: 'center',
    alignSelf: 'center',
    opacity: 0.4,
    letterSpacing: 0.4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'center',
    marginVertical: spacing.md,
  },
  boldText: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.white,
    textAlign: 'center',
    alignSelf: 'center',
    letterSpacing: 0.4,
  },
  regularText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.lightWhite,
    textAlign: 'center',
    alignSelf: 'center',
    letterSpacing: 0.4,
    marginTop: 2,
  },
  mainContainer:{
    marginTop:spacing.xs,
    marginBottom:spacing.lg,
    alignSelf:"center",
    width:"90%",
    height:40
  }
});