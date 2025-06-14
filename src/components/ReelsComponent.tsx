import React, { useState } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { videoData } from "../../videodata";
import { Dimensions, StyleSheet } from "react-native";
import SingleReel from "./SingleReel";

const { height, width } = Dimensions.get("window");

export const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SwiperFlatList
      vertical
      data={videoData}
      onChangeIndex={({ index }) => setCurrentIndex(index)}
      renderItem={({ item, index }) => (
        <SingleReel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item) => item.id}
      showPagination={false}
      pagingEnabled
      snapToInterval={Dimensions.get("window").height}
      decelerationRate="fast"
      disableGesture={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: height, // This is crucial
    width: width,
  },
});

// import React, { useState } from 'react';
// import { SwiperFlatList } from 'react-native-swiper-flatlist';
// import { videoData } from '../../videodata';
// import  SingleReel  from './SingleReel';
// import SwipeCard from './SwiperCard';

// export const ReelsComponent = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   return (
//   <SwiperFlatList
//       vertical
//       onChangeIndex={({ index }) => setCurrentIndex(index)}
//       data={videoData}
//       renderItem={({ item, index }) => (
//         <SwipeCard
//           onSwipeLeft={() => console.log('Disliked Reel', index)}
//           onSwipeRight={() => console.log('Liked Reel', index)}
//         >
//           <SingleReel item={item} index={index} currentIndex={currentIndex} />
//         </SwipeCard>
//       )}
//       keyExtractor={(item) => item.id}
//       showPagination={false}
//     />
//   );
// };
