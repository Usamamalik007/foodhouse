import React, {useCallback, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
// import Image from 'react-native-fast-image';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width} = Dimensions.get('screen');

export default function AppCaraosaul() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carouselItems = [1, 2, 3, 4, 5];

  const RenderItemImage = useCallback(
    ({image}) => <RenderCarouselItem image={image} />,
    [],
  );

  const RenderCarouselItem = React.memo(({image}: {image: string}) => {
    return (
      <View style={{height: 100}}>
        <Image
          style={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            width: undefined,
            height: undefined,
            flex: 1,
          }}
          //   source={{uri: productInfo.productImage}}
          source={require('../assets/imgs/sampleSale.png')}
          resizeMode="cover"
        />
      </View>
    );
  });
  return (
    <>
      <Carousel
        //   https://github.com/meliorence/react-native-snap-carousel/issues/551#issuecomment-506814644
        containerCustomStyle={{flexGrow: 0}}
        style={{maxHeight: 200}}
        layout="default"
        // data={[productInfo.productImage]}
        data={carouselItems}
        sliderWidth={width}
        itemWidth={width}
        inactiveSlideScale={1}
        onSnapToItem={setActiveSlideIndex}
        renderItem={RenderItemImage}
        horizontal
        pagingEnabled
      />
      <Pagination
        containerStyle={{
          zIndex: 10,
          backgroundColor: 'rgba(0,0,0,0)',
          marginTop: -50,
        }}
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlideIndex}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: -4,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  );
}
