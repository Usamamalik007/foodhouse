import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

function AppFavourite() {

  const [favourite, setFavourite] = useState<boolean>(false);

  return (
    <View style={innerStyles.favourite}>
      <TouchableOpacity onPress={() => setFavourite(!favourite)}>
        <Ionicons
          name={favourite ? 'heart-outline' : 'heart'}
          size={25}
          color={favourite ? '#373737' : '#CE3E3E'}
        />
      </TouchableOpacity>
    </View>
  );
}

export default AppFavourite;

const innerStyles = StyleSheet.create({
  favourite: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    width: 45,
    right: 5,
    elevation: 5,
    top: 5,
    zIndex: 1000,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150 / 2,
  },
});
