import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

export default function AppProductDetailSwiper() {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Swiper
        style={innerStyles.wrapper}
        loop
        autoplay
        dotColor="gray"
        activeDotColor="#FFFFFF">
        <Image
          style={innerStyles.slide}
          source={require('../assets/imgs/burger.jpeg')}
          resizeMode={'cover'}
        />
        <Image
          style={innerStyles.slide}
          source={require('../assets/imgs/burger.jpeg')}
          resizeMode={'cover'}
        />
        <Image
          style={innerStyles.slide}
          source={require('../assets/imgs/burger.jpeg')}
          resizeMode={'cover'}
        />
      </Swiper>
    </View>
  );
}

const innerStyles = StyleSheet.create({
  wrapper: {
    height: 250,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    width: '100%',
  },
});
