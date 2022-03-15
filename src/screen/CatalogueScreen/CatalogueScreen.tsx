import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import styles from '../../assets/css/style';
import AppCatalogueCategory from '../../component/AppCatalogueCategory';
import AppTextTitle from '../../component/AppTextTitle';

export default function CatalogueScreen() {
  return (
    <SafeAreaView style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <AppTextTitle title="Categories" />
        <AppCatalogueCategory
          catalogueName="Burgers"
          nextNavigationScreen={'CatalogueScreenLvlTwo'}
        />
        <AppCatalogueCategory
          catalogueName="Beverages"
          nextNavigationScreen={'CatalogueScreenLvlTwo'}
        />
        <AppCatalogueCategory
          catalogueName="Sides"
          nextNavigationScreen={'CatalogueScreenLvlTwo'}
        />
        <AppCatalogueCategory
          catalogueName="Desserts"
          nextNavigationScreen={'CatalogueScreenLvlTwo'}
        />
        <AppCatalogueCategory
          catalogueName="Deals"
          nextNavigationScreen={'CatalogueScreenLvlTwo'}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
