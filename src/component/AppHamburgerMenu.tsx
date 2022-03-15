import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

export default function AppHamburgerMenu(props: any) {
  const goTo = props?.render;
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={{padding: 20}}
      onPress={() => {
        navigation.navigate('ProfileScreenStack');
      }}>
      <Image
        source={require('../assets/imgs/menu.png')}
        resizeMode={'contain'}
        style={{width: 25, height: 25, marginRight: 10}}
      />
    </TouchableOpacity>
  );
}
