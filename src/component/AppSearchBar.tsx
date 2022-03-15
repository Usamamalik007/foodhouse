import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

export default function AppSearchBarHeader(props: any) {
  const goTo = props?.render;
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={{paddingRight: 10}}
      onPress={() => {
        navigation.navigate('SearchScreen');
      }}>
      <Image
        source={require('../assets/imgs/SearchIcon.png')}
        resizeMode={'contain'}
        style={{width: 25, height: 25, marginRight: 10}}
      />
    </TouchableOpacity>
  );
}
