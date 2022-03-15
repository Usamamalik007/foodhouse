import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import AppCatalogueCategory from '../../component/AppCatalogueCategory';
import AppTextTitle from '../../component/AppTextTitle';
import {CategorySub} from '../../interfaces/ICategoryData';

export default function CatalogueScreenLvlThree(props: any) {
  const lvlThreeCatalogueList = props.route.params;
  console.log('lvlThreeCatalogueList', lvlThreeCatalogueList);

  return (
    <SafeAreaView style={{paddingLeft: 15, paddingRight: 15}}>
      <ScrollView>
        {lvlThreeCatalogueList.map(
          (lvlFourCategoryList: CategorySub, index: Number) => {
            return (
              <View>
                <AppTextTitle title={lvlFourCategoryList?.name} />

                {console.log('OKk', lvlFourCategoryList.sub)}
                {lvlFourCategoryList.sub &&
                  lvlFourCategoryList?.sub.map(
                    (lvlFourCategory: CategorySub, index: Number) => {
                      return (
                        <AppCatalogueCategory
                          catalogueName={lvlFourCategory.name}
                          nextNavigationScreen={'ItemScreen'}
                          catalogueData={lvlFourCategory.id}
                        />
                      );
                    },
                  )}
              </View>
            );
          },
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
