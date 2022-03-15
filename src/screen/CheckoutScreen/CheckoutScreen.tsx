import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';

import AppTextTitle from '../../component/AppTextTitle';
import {appColors} from '../../utils/colors';
import AppAddToCart from '../../component/AppAddToCart';
import AppCheckoutModal from '../../component/AppCheckoutModal';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/core';
import {CartResponse} from '../../interfaces/ICartData';
import {useCheckout} from '../../hooks/Checkout/useCheckout';
import {SnackbarError, SnackbarSuccess} from '../../utils/SnackBar';

export default function CheckoutScreen(props: any) {
  const [checked, setChecked] = useState('CashOnDelivery');
  const navigation = useNavigation<any>();
  const [opencheckoutModal, setCheckoutModal] = useState(false);
  const cartInfo: CartResponse = props.route.params;

  console.log('Cart Info', cartInfo);

  const checkOutCustomerRequest = useCheckout({
    onSuccess(res) {
      setCheckoutModal(true);
    },
    onError() {
      SnackbarError('Error in Updating');
    },
  });
  return (
    <SafeAreaView style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
      <ScrollView>
        <AppTextTitle title="Checkout" />
        <View style={innerStyles.shippingCard}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 22,
              justifyContent: 'space-between',
            }}>
            <AppTextTitle title="Shipping Address" />
            <TouchableOpacity
              style={{
                marginRight: 31,
                marginTop: 22,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                console.log('Pressed');
                navigation.navigate('MapScreen');
              }}>
              <Text>Edit</Text>
              <Ionicons name="chevron-forward" size={15} />
            </TouchableOpacity>
          </View>
          <Text style={{margin: 15}}>{cartInfo.shipping_address}</Text>
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: 24.7136,
              longitude: 46.6753,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: 24.7136,
                longitude: 46.6753,
              }}
            />
          </MapView>
        </View>

        {/* Payment Card */}
        <View style={innerStyles.paymentCard}>
          <View
            style={{
              marginLeft: 22,
            }}>
            <AppTextTitle title="Payment" />
            <View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  justifyContent: 'space-between',
                }}>
                <RadioButton
                  value="Card"
                  color={appColors.darkGrey}
                  status={checked === 'Card' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('Card')}
                />
                <View style={{marginRight: 100}}>
                  <Text>**** **** **** 3409</Text>
                </View>

                <TouchableOpacity
                  style={{
                    marginRight: 31,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    console.log('Pressed');
                  }}>
                  <Text>Edit</Text>
                  <Ionicons name="chevron-forward" size={15} />
                </TouchableOpacity>
              </View> */}

              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <RadioButton
                  color={appColors.darkGrey}
                  value="CashOnDelivery"
                  status={
                    checked === 'CashOnDelivery' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setChecked('CashOnDelivery')}
                />
                <View style={{marginTop: 7}}>
                  <Text>Cash On Delivery</Text>
                </View>
              </View>

              {/* <View style={{flexDirection: 'row', marginBottom: 10}}>
                <RadioButton
                  value="applePay"
                  color={appColors.darkGrey}
                  status={checked === 'applePay' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('applePay')}
                />
                <Image
                  style={{width: 68, height: 25, marginTop: 5}}
                  source={require('../../assets/imgs/ApplePayIcon.png')}
                  resizeMode={'contain'}
                />
              </View> */}
              {/* 
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <RadioButton
                  value="googlePay"
                  color={appColors.darkGrey}
                  status={checked === 'googlePay' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('googlePay')}
                />
                <Image
                  style={{width: 72, height: 50, marginTop: -5}}
                  source={require('../../assets/imgs/GooglePayIcon.png')}
                  resizeMode={'contain'}
                />
              </View> */}
            </View>
          </View>
        </View>

        <View
          style={[
            innerStyles.paymentCard,
            {flex: 1, height: 100, justifyContent: 'space-evenly'},
          ]}>
          <View
            style={{
              justifyContent: 'space-between',
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
            }}>
            <Text style={innerStyles.text}>Products</Text>
            <Text style={innerStyles.text}>${cartInfo.totalBill}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
            }}>
            <Text style={innerStyles.text}>Delivery</Text>
            <Text style={innerStyles.text}>$20</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
            }}>
            <Text style={innerStyles.text}>Tax</Text>
            <Text style={innerStyles.text}>${cartInfo.salesTax}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              marginLeft: 10,
              marginRight: 10,
              flexDirection: 'row',
            }}>
            <Text style={innerStyles.textPrice}>Total</Text>
            <Text style={innerStyles.textPrice}>${cartInfo.totalBill}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{bottom: 0}}
          onPress={() => {
            checkOutCustomerRequest.mutate({});
          }}>
          <AppAddToCart title={'Check Out'} />
        </TouchableOpacity>
      </ScrollView>
      {opencheckoutModal && (
        <AppCheckoutModal open={opencheckoutModal} setOpen={setCheckoutModal} />
      )}
    </SafeAreaView>
  );
}

const innerStyles = StyleSheet.create({
  shippingCard: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    height: 350,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  paymentCard: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    height: 100,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Gotham',
    fontSize: 12,
    fontWeight: '500',
  },
  textPrice: {
    fontFamily: 'Gotham',
    fontSize: 24,
    fontWeight: '500',
  },
});
