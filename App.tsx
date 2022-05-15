import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AuthFlow, MainFlow} from './Navigators';
import {Provider, useDispatch} from 'react-redux';
import {store} from './src/store/redux';
import {useAppSelector} from './src/store/hooks';
import {loadUserFromStorage} from './src/store/userSlice';
import {Image, Text, View} from 'react-native';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AppBootStrap />
        </QueryClientProvider>
      </NavigationContainer>
    </Provider>
  );
}

const AppBootStrap = React.memo(function () {
  const userState: any = useAppSelector(state => state.user);
  var userdata: any = userState.user;
  console.log('consoling user data222')
  console.log(userState.user)
  if (
    !userState.isLoadingStorageData &&
    userState.user &&
    !userState.user.token
  ) {
    userdata = userState.user;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  if (userState.isLoadingStorageData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('./src/assets/imgs/logo2.jpeg')}
          style={{height: 50,
            width: 190,
            alignSelf: 'center',}}
          resizeMode={'contain'}
        />
        {/* <Image
          source={require('./src/assets/imgs/logo1.png')}
          style={{height: 50,
            width: 190,
            alignSelf: 'center',}}
          resizeMode={'contain'}
        /> */}
      </View>
    );
  }

  return (
    <>
      {userState.isLoggedIn && <MainFlow />}
      {!userState.isLoggedIn && <AuthFlow />}
    </>
  );
});
export default App;
