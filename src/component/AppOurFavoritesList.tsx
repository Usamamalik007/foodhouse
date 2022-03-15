import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import styles from '../assets/css/style';

type CatalagueSections =
  | 'TopAndShirts'
  | 'BagsAndAccessories'
  | 'Bags'
  | 'Sports'
  | 'Home'
  | 'MenShoe'
  | 'LadiesBags';

export default function AppOurFavoritesList(categoryList: any) {
  const [profileSection, setProfileSection] =
    useState<CatalagueSections>('TopAndShirts');
  const carouselItems = [
    'Burgers',
    'Beverages',
    'Sides',
    'Desserts',
    'Deals',
  ];
  console.log('categoryList is: ', JSON.stringify(categoryList))
  return (
    <View>
      <View style={{flexShrink: 0}}>
        <ScrollView
          contentContainerStyle={[{flexDirection: 'row'}, styles.pb5]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {categoryList && categoryList.categoryList?.length > 0 && categoryList.categoryList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setProfileSection('TopAndShirts');
                }}
                style={[
                  styles.p10,
                  styles.br10,
                  styles.mt10,
                  styles.shadow,
                  {
                    marginLeft: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:'#429b44'
                  },
                ]}>
                  <Text
                    style={[
                      styles.fs16,
                      styles.ffm,
                      styles.colorWhite,
                      {
                        // fontWeight: 'bold',
                      },
                    ]}>
                    {item.name}
                  </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
