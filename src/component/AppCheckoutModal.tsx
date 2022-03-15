import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

import AppAddToCart from './AppAddToCart';

const {width} = Dimensions.get('screen');
export default function AppCheckoutModal({open, setOpen}: any) {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Modal
        isVisible={open}
        hasBackdrop={true}
        deviceWidth={width}
        backdropTransitionOutTiming={0}
        animationInTiming={400}
        style={{justifyContent: 'center', alignItems: 'center'}}
        onBackButtonPress={() => {
          setOpen(false);
        }}
        onBackdropPress={() => {
          setOpen(false);
        }}>
        <View
          style={{
            alignSelf: 'center',
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 3,
            height: 290,
          }}>
          <Image
            source={require('../assets/imgs/confirm.png')}
            style={{height: 64, width: 64, alignSelf: 'center'}}
            resizeMode={'cover'}
          />
          <Text style={{fontSize: 25, color: '#34283E', marginTop: 7}}>
            Payment was successful
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#605A65',
              marginVertical: 4,
              textAlign: 'center',
            }}>
            Your order will be delivered soon. It can be tracked in the "Orders"
            section.
          </Text>
          <TouchableOpacity style={{}}>
            <AppAddToCart title={'Back to Shopping'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')}>
            <Text style={{textAlign: 'center', fontSize: 17, color: '#9B9B9B'}}>
              My Orders
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const innerStyles = StyleSheet.create({
  editImage: {
    height: 55,
    width: 55,
    borderRadius: 50,
    margin: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 200,
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 282,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
