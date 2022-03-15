import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {appColors} from '../utils/colors';

export default function AppOptionCard(props: any) {
  return (
    <TouchableOpacity
      style={innerStyles.mainContainer}
      onPress={() => props.changeValue(props.data.id)}>
      <View style={innerStyles.subMainContainer}>
        <Image
          source={props.data.image}
          style={innerStyles.image}
          resizeMode={'contain'}
        />
        <Text>{props.data.name}</Text>
      </View>
      {props.data.value && <Text>({props.data.value})</Text>}
    </TouchableOpacity>
  );
}

const innerStyles = StyleSheet.create({
  mainContainer: {
    width: '95%',
    backgroundColor: appColors.white,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 8,
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subMainContainer: {flexDirection: 'row', alignItems: 'center'},
  image: {
    height: 18,
    width: 20,
    marginRight: 8,
  },
});
