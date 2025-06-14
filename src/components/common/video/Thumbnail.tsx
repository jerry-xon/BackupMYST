import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from 'src/themes/colors';

const HEIGHT = 100;
const BORDER_WIDTH = 4;

interface ImageWithBorderProps {
  uri: string;
  acitve: boolean;
  onPress: () => void;
}

interface ThumbnailProps {
  onPress: (uri: string) => void;
  data: string[] | null;
  onEndReached?: () => void;
}

const GradientBorderImage = ({ colors }: { colors: string[] }) => {
  return (
    <MaskedView
      style={{ height: HEIGHT, width: HEIGHT }}
      maskElement={
        <View style={styles.maskContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle} />
          </View>
        </View>
      }
    >
      <LinearGradient
        colors={colors as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    </MaskedView>
  );
};

const ImageWithBorder = (props: ImageWithBorderProps) => {
  const imageSize = HEIGHT - (props.acitve ? BORDER_WIDTH * 2 : 0);

  return (
    <Pressable style={styles.imageWrapper} onPress={props.onPress}>
      {props.acitve && (
        <GradientBorderImage colors={colors.linearGradient.activeInputBox} />
      )}
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            top: props.acitve ? BORDER_WIDTH : 0,
            left: props.acitve ? BORDER_WIDTH : 0,
            right: props.acitve ? BORDER_WIDTH : 0,
            bottom: props.acitve ? BORDER_WIDTH : 0,
            overflow: 'hidden',
          },
        ]}
      >
        <Image
          source={{
            uri: props.uri,
          }}
          style={styles.image}
        />
      </View>
    </Pressable>
  );
};

const Thumbnail = (props: ThumbnailProps) => {

  const [selected, setSelected] = React.useState<{ [key: string]: string }>({});

  const handlePress = (uri: string) => {
    console.log("uri",uri)
    props.onPress(uri);
    setSelected((prev) => (prev.hasOwnProperty(uri) ? {} : { [uri]: uri }));
  };

  React.useEffect(()=>{
    if(!!props.data && props?.data?.length > 0){
      setSelected({
        ...selected,
        [props?.data[0]]: props?.data[0],
      });
    }
  },[props.data])

  
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data || []}
        renderItem={({item})=>{
          return(
            <ImageWithBorder
            uri={item}
            acitve={selected.hasOwnProperty(item)}
          onPress={() => handlePress(item)}
        />
          )
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
        keyExtractor={(item) => item}
        onEndReached={props.onEndReached}
      />
    </View>
  );
};

export default React.memo(Thumbnail);

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    justifyContent: 'center',
    width: '100%',
  },
  maskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: HEIGHT,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  outerCircle: {
    width: HEIGHT,
    height: HEIGHT,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: HEIGHT ,
    height: HEIGHT,
  },
});
