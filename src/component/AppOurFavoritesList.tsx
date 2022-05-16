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
type AppProps = {
  selectCategory: any,
  categoryList: any
}
export default function AppOurFavoritesList  (props: any) {
  const [profileSection, setProfileSection] =
    useState<CatalagueSections>('TopAndShirts');
  const carouselItems = [
    'Burgers',
    'Beverages',
    'Sides',
    'Desserts',
    'Deals',
  ];
  // console.log('categoryList is: ', JSON.stringify(categoryList))
  const {
    categoryList,
    selectCategory
  } = props
  console.log('adeed props', props)
  return (
    <View>
      <View style={{flexShrink: 0}}>
        <ScrollView
          contentContainerStyle={[{flexDirection: 'row'}, styles.pb5]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {categoryList && categoryList?.length > 0 && categoryList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setProfileSection('TopAndShirts');

                  props.selectCategory(index)
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
                    backgroundColor: item.selected ? '#429b44' : 'blue'
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
