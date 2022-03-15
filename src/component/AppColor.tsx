import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

const colorsList = [
  {
    id: 1,
    name: '#696B6D',
  },
  {
    id: 2,
    name: '#C7C4A3',
  },
  {
    id: 3,
    name: '#F2C8B6',
  },
  {
    id: 4,
    name: '#34283E',
  },
];

function AppColor(props: any) {
  return (
    <View style={{}}>
      <View>
        <Text
          style={[
            innerStyles.title,
            {fontSize: props.tittleSize, fontWeight: props.fontWeight},
          ]}>
          Color
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={innerStyles.mainContainer}>
            {colorsList.map((clr: any) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props?.setSelected((prev: any) => ({
                      ...prev,
                      color: clr.name,
                    }))
                  }
                  key={clr.id}
                  style={[
                    {
                      marginHorizontal:3,
                      borderWidth: props?.selectedData?.color?.includes(
                        clr.name,
                      )
                        ? 2
                        : 0,
                      borderColor: props?.selectedData?.color?.includes(
                        clr.name,
                      )
                        ? 'black'
                        : '',
                        borderRadius: props?.selectedData?.color?.includes(
                          clr.name,
                        )
                          ? 150/2
                          : 0,
                    },
                  ]}>
                  <View
                    style={[
                      innerStyles.colorContainer,
                      {
                        backgroundColor: clr.name,
                        padding: props.colorSize,
                      },
                    ]}></View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default AppColor;

const innerStyles = StyleSheet.create({
  title: {
    color: '#34283E',
    marginVertical: 5,
  },
  mainContainer: {
    flexDirection: 'row',
  },
  colorContainer: {
    borderRadius: 150 / 2,
    margin: 3,
  },
});
