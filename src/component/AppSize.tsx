import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

const sizeList = [
  {
    id: 1,
    name: 'XXS',
  },
  {
    id: 2,
    name: 'XS',
  },
  {
    id: 3,
    name: 'S',
  },
  {
    id: 4,
    name: 'M',
  },
  {
    id: 5,
    name: 'L',
  },
  {
    id: 6,
    name: 'XL',
  },
];

function AppSize(props: any) {

  return (
    <View>
      <Text
        style={[
          innerStyles.title,
          {fontSize: props.tittleSize, fontWeight: props.fontWeight},
        ]}>
        Size
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={innerStyles.mainContainer}>
          {sizeList.map((size: any ) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props?.setSelected((prev: any) => ({
                    ...prev,
                    size: size.name,
                  }))
                }
                key={size.id}
                style={[
                  innerStyles.sizeContainer,
                  {
                    paddingVertical: props.verticalPadding,
                    paddingHorizontal: props.horizontalPadding,
                    backgroundColor:
                      props?.selectedData?.size == size.name ? '#696B6D' : 'white',
                  },
                ]}>
                <Text
                  style={{
                    color:
                      props?.selectedData?.size == size.name
                        ? 'white'
                        : '#696B6D',
                  }}>
                  {size.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default AppSize;

const innerStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#34283E',
    marginVertical: 5,
  },
  mainContainer: {
    flexDirection: 'row',
  },
  sizeContainer: {
    borderWidth: 1,
    borderColor: '#696B6D',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 8,
    margin: 5,
    // color: '#696B6D',
  },
});
