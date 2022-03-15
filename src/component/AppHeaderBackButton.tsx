import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Image} from 'react-native';
import {appColors} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AppHeaderBackButton(props: any) {
  const goTo = props?.render;
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={{paddingLeft: 20}}
      onPress={() => {
        navigation.goBack();
      }}>
      <Ionicons
        name={'arrow-back-outline'}
        size={25}
        color={appColors.darkGrey}
      />
    </TouchableOpacity>
  );
}
