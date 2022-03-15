import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {TouchableOpacity} from 'react-native';

import AppTextTitle from './AppTextTitle';

function AppAddressBookModal({open, setOpen}: any) {
  console.log(`open`, open);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}>
        <View style={innerStyles.container}>
          <View style={innerStyles.modalContainer}>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <AppTextTitle title={'Address Book'} />
            </View>
            <View style={{padding: 16, borderWidth: 1, borderColor: '#000000'}}>
              <Text style={{color: '#070A0D'}}>billing address</Text>
              <Text style={{color: '#070A0D', marginVertical: 5}}>
                You have not set a default billing address.
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('{ressed');
                  }}>
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

            <View style={{padding: 16}}>
              <Text style={{color: '#070A0D', marginVertical: 5}}>
                shipping address
              </Text>
              <Text style={{color: '#070A0D'}}>
                You have not set a default shipping address.
              </Text>
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
          </View>
        </View>
      </Modal>
    </View>
  );
}

const innerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0 , 0 , 0 , 0.7)',
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 332,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default AppAddressBookModal;
