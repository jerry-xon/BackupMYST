import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Rocket from "@assets/icons/svg/RocketIcon"
import Grid from '@assets/icons/svg/GridIcon';
import Premium from '@assets/icons/svg/Premium';
import useDeviceMedia from 'src/hooks/useDeviceMedia';
import { colors } from 'src/themes/colors';


interface ProfileMediaProps {
  headerComponent?:React.ReactNode
}
interface ProfileTabsProps {
    onPress:()=>void,
    children?:React.ReactNode
}

const ProfileMedia = (Props:ProfileMediaProps) => {

    const [prevIndex, setPrevIndex] = React.useState<number>(1);
    const media = useDeviceMedia()

const onTapTab = (index:number)=>{
    console.log(prevIndex , index)
    if(prevIndex !== index){
        setPrevIndex(index)
    } 
}

const sectionTabs = React.useCallback(()=>{


    return (
      <View style={styles.row}>
        <ProfileTabs onPress={() => onTapTab(1)}>
          <Rocket fill={prevIndex === 1 ? 'white' : 'gray'} />
        </ProfileTabs>
        <ProfileTabs onPress={() => onTapTab(2)}>
          <Grid fill={prevIndex === 2 ? 'white' : 'gray'} />
        </ProfileTabs>
        <ProfileTabs onPress={() => onTapTab(3)}>
          <Premium fill={prevIndex === 3 ? 'white' : 'gray'} />
        </ProfileTabs>
      </View>
    );
},[prevIndex])

const renderItem = React.useCallback(()=>{
    return (
      <Pressable style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          style={styles.image}
        />
      </Pressable>
    );
},[])



const listTopView = React.useMemo(() => {
  if (Props?.headerComponent) {
    return (
      <View>
        {Props.headerComponent}
        {sectionTabs()}
      </View>
    );
  }
  return null;
}, [Props.headerComponent, prevIndex]);

  return (
    <View style={styles.conatiner}>
           <FlatList
            ListHeaderComponent={listTopView}
             data={Array(120).fill(0)}
            //  StickyHeaderComponent={sectionTabs}
             keyExtractor={(item, index) => index.toString()}
             numColumns={3}
             renderItem={renderItem}
             contentContainerStyle={styles.listContainer}
             bounces={true}
           />
    </View>
  );
}


const ProfileTabs = React.memo((Props: ProfileTabsProps) => {
  return (
    <Pressable style={styles.tabsContainer} onPress={() => Props.onPress()}>
      {Props?.children}
    </Pressable>
  );
});
 


const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  tabsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 50,
    minHeight: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    height: 120,
    borderColor: colors.darkBlue,
  },
  image:{
    height:"100%",
    width:"100%"
  }
});

export default ProfileMedia;
