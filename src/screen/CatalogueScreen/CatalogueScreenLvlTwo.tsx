import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import styles from '../../assets/css/style';
import AppCatalogueCategory from '../../component/AppCatalogueCategory';
import {useGetCategoryList} from '../../hooks/Category/useCategoryList';
import {ICatagoryResponse} from '../../interfaces/ICategoryData';
import {appColors} from '../../utils/colors';

export default function CatalogueScreenLvlTwo() {
  const [selectedIndex, setselectedIndex] = useState(0);
  const handleIndexChange = (index: any) => {
    setselectedIndex(index);
  };
  const getAllCategoyList = useGetCategoryList<ICatagoryResponse>();

  console.log('get', getAllCategoyList);

  return (
    <SafeAreaView>
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
        <SegmentedControlTab
          tabTextStyle={{color: appColors.black}}
          activeTabStyle={{
            backgroundColor: appColors.white,
            borderBottomColor: appColors.black,
          }}
          activeTabTextStyle={{
            color: appColors.black,
          }}
          tabStyle={{
            padding: 20,
            borderColor: appColors.white,
            backgroundColor: appColors.white,
            borderRadius: 0,
          }}
          values={['WOMEN', 'MEN', 'BEAUTY', 'KIDS', 'HOME']}
          selectedIndex={selectedIndex}
          onTabPress={handleIndexChange}
        />
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedIndex == 0 && (
          <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
            {getAllCategoyList?.data?.categories[0].sub.map(
              (category, index) => {
                return (
                  <AppCatalogueCategory
                    catalogueName={category.name}
                    nextNavigationScreen={'CatalogueScreenLvlThree'}
                    catalogueData={category.sub}
                  />
                );
              },
            )}
          </View>
        )}
        {selectedIndex == 1 && (
          <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
            {getAllCategoyList?.data?.categories[1].sub.map(
              (category, index) => {
                return (
                  <AppCatalogueCategory
                    catalogueName={category.name}
                    nextNavigationScreen={'CatalogueScreenLvlThree'}
                    catalogueData={category.sub}
                  />
                );
              },
            )}
          </View>
        )}
        {selectedIndex == 2 && (
          <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
            {getAllCategoyList?.data?.categories[2].sub.map(
              (category, index) => {
                return (
                  <AppCatalogueCategory
                    catalogueName={category.name}
                    nextNavigationScreen={'CatalogueScreenLvlThree'}
                    catalogueData={category.sub}
                  />
                );
              },
            )}
          </View>
        )}
        {selectedIndex == 3 && (
          <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
            {getAllCategoyList.data?.categories[3].sub.map(
              (category, index) => {
                return (
                  <AppCatalogueCategory
                    catalogueName={category.name}
                    nextNavigationScreen={'CatalogueScreenLvlThree'}
                    catalogueData={category.sub}
                  />
                );
              },
            )}
          </View>
        )}
        {selectedIndex == 4 && (
          <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
            {getAllCategoyList.data?.categories[4].sub.map(
              (category, index) => {
                return (
                  <AppCatalogueCategory
                    catalogueName={category.name}
                    nextNavigationScreen={'CatalogueScreenLvlThree'}
                    catalogueData={category.sub}
                  />
                );
              },
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
