import React from 'react';
import {View, Text} from 'react-native';
import styles from '../assets/css/style';

interface IAppTextTitle {
  title: string;
}
export default function AppTextTitle({title}: IAppTextTitle) {
  return (
    <View style={{marginTop: 15, marginBottom: 15}}>
      <Text
        style={[
          styles.ffgt,
          styles.fs20,
          {color: '#34283E', fontWeight: '500'},
        ]}>
        {title}
      </Text>
    </View>
  );
}
