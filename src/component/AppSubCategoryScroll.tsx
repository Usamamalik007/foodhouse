import React from 'react';
import {View, Text} from 'react-native';

export default function AppSubCategoryScroll() {
  const [profileSection, setProfileSection] =
    useState<CatalagueSections>('TopAndShirts');
  const carouselItems = [
    'Top & Shirts',
    'Bags & Accessories',
    'Bags',
    'Sports',
    'Home',
    'Men Shoe',
    'Ladies Bags',
  ];
  return (
    <View>
      <View style={{flexShrink: 0, height: 120}}>
        <ScrollView
          contentContainerStyle={[{flexDirection: 'row'}, styles.pb5]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {carouselItems.map((item , index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setProfileSection('TopAndShirts');
                }}
                key={index}
                style={[
                  styles.p10,
                  styles.br20,
                  styles.mt10,
                  styles.shadow,
                  {
                    marginLeft: 20,
                    height: 100,
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <ImageBackground
                  source={require('../assets/imgs/FavouriteSample.png')}
                  resizeMode="cover"
                  style={[
                    styles.br20,
                    styles.mr15,
                    {
                      overflow: 'hidden',
                      alignItems: 'center',
                      width: 100,
                      height: 100,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.fs12,
                      styles.mt45,
                      styles.ffm,
                      styles.colorWhite,
                      {
                        fontWeight: 'bold',
                      },
                    ]}>
                    {item}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
