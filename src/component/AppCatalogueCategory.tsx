import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import styles from '../assets/css/style';

interface IAppCatalogue {
  catalogueName: string;
  nextNavigationScreen: string;
  catalogueData?: any;
}
export default function AppCatalogueCategory({
  catalogueName,
  nextNavigationScreen,
  catalogueData,
}: IAppCatalogue) {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate('CatalogueScreenLvlOne');
        // navigation.navigate(nextNavigationScreen, catalogueData);
      }}>
      <View style={innerStyles.catalogueCard}>
        <Text style={[innerStyles.text, {marginTop: 32, marginLeft: 34}]}>
          {catalogueName}
        </Text>
        <Image
          source={require('../assets/imgs/burger.jpeg')}
          style={innerStyles.image}
          resizeMode={'contain'}
        />
      </View>
    </TouchableOpacity>
  );
}

const innerStyles = StyleSheet.create({
  catalogueCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  image: {
    height: 88,
    width: 88,
  },
  text: {
    fontFamily: 'Gotham',
    fontSize: 18,
    fontWeight: '500',
  },
});
