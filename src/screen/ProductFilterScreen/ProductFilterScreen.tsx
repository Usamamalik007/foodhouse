import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';

import AppSize from '../../component/AppSize';
import AppColor from '../../component/AppColor';
import RangeSlider from '../slider';
import AppDropdown from '../../component/AppDropDown';
import AppAddToCart from '../../component/AppAddToCart';

const categoryList = [
  {
    id: 1,
    label: 'Dresses',
  },
  {
    id: 2,
    label: 'Tops & Shirts',
  },
  {
    id: 3,
    label: 'Trousers & Shorts',
  },
  {
    id: 4,
    label: 'Denim',
  },
  {
    id: 5,
    label: 'Jumpsuits and playsuits',
  },
];
function ProductFilterScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [filterData, setFilterData] = useState({
    pageNo: 1,
    limit: 10,
  });
  return (
    <View style={innerStyles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: 20,
        }}>
        <RangeSlider from={15} to={150} setFilterData={setFilterData} />
        <View>
          <Text style={innerStyles.title}>Categories</Text>
          <AppDropdown
            name="categories"
            control={control}
            dropdownInputProps={{
              placeholder: 'Dresses',
              multiple: true,
            }}
            data={categoryList}
            setCurrentValue={setFilterData}
            outerViewProps={{
              style: {
                backgroundColor: '#F5F5F5',
                borderColor:"#383A3D",
                borderWidth:1
              },
            }}
          />
        </View>

        <View>
          <Text style={innerStyles.title}>Product Type</Text>
          <AppDropdown
            name="type"
            control={control}
            dropdownInputProps={{
              placeholder: 'Dresses',
              multiple: true,
            }}
            data={categoryList}
            // setCurrentValue={setCurrentValue}
            // currentValue={currentValue}
            outerViewProps={{
              style: {
                backgroundColor: '#F5F5F5',
                borderColor:"#383A3D",
                borderWidth:1
              },
            }}
          />
        </View>

        <View>
          <Text style={innerStyles.title}>Brand</Text>
          <AppDropdown
            name="brand"
            control={control}
            dropdownInputProps={{
              placeholder: 'ZARA, LiLu, Love Republic, Tezenis, ',
              multiple: true,
            }}
            outerViewProps={{
              style: {
                backgroundColor: '#F5F5F5',
                borderColor:"#383A3D",
                borderWidth:1
              },
            }}
            data={categoryList}
            // setCurrentValue={setCurrentValue}
            // currentValue={currentValue}
          />
        </View>

        <AppColor
          tittleSize={16}
          colorSize={20}
          fontWeight={'600'}
          setSelected={setFilterData}
          selectedData={filterData}
        />
        <AppSize
          tittleSize={16}
          verticalPadding={15}
          horizontalPadding={3}
          fontWeight={'600'}
          setSelected={setFilterData}
          selectedData={filterData}
        />

        <View>
          <Text style={innerStyles.title}>Sort</Text>
          <AppDropdown
            name="sort"
            control={control}
            dropdownInputProps={{
              placeholder: 'New First',
              multiple: true,
            }}
            data={categoryList}
            // setCurrentValue={setCurrentValue}
            // currentValue={currentValue}
            outerViewProps={{
              style: {
                backgroundColor: '#F5F5F5',
                borderColor:"#383A3D",
                borderWidth:1
              },
            }}
          />
        </View>
        <AppAddToCart title={'Results (30) '} />
      </ScrollView>
    </View>
  );
}

export default ProductFilterScreen;

const innerStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  title: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});
