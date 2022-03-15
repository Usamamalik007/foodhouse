import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import AppAddToCart from './AppAddToCart';

import AppTextTitle from './AppTextTitle';
import Modal from 'react-native-modal';

function AppPaymentModal({open, setOpen}: any) {
  return (
    <Modal
      isVisible={open}
      hasBackdrop={true}
      style={{justifyContent: 'flex-end', bottom: 0, margin: 0}}
      onBackButtonPress={() => {
        setOpen(false);
      }}
      onBackdropPress={() => {
        setOpen(false);
      }}>
      <View style={innerStyles.container}>
        <View style={innerStyles.modalContainer}>
          <View
            style={{
              alignSelf: 'center',
            }}>
            <AppTextTitle title={'Payment Information'} />
          </View>
          <View style={{padding: 16, borderWidth: 1, borderColor: '#000000'}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text>mastercard</Text>
              </View>
              <Text>*** *** **** 3409</Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Pressed update');
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: '#070A0D',
                    fontSize: 12,
                  }}>
                  Update
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: '700',
                    color: '#070A0D',
                    fontSize: 12,
                    marginLeft: 7,
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{padding: 16}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text>mastercard</Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <TouchableOpacity>
                  <Text
                    style={{fontWeight: '700', color: '#070A0D', fontSize: 12}}>
                    Update
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: '700',
                    color: '#070A0D',
                    fontSize: 12,
                    marginLeft: 7,
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <AppAddToCart title={'Add New'} />
        </View>
      </View>
      </View>
    </Modal>
  );
}

const innerStyles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200,
    // padding: 24,
    // backgroundColor: 'rgba(0 , 0 , 0 , 0.7)',
  },
  modalContainer: {
    backgroundColor: 'white',
    // height: 282,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default AppPaymentModal;
