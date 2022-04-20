// First we need to import axios.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userKey} from '../store/userSlice';
import {
  SERVER_URL_CUSTOMER,
  SERVER_URL_USER,
  SERVER_URL_ADMIN,
} from './constants';
import {IUserSessionData} from '../interfaces/IAuthData';
import { Alert } from 'react-native';

const instanceUser = axios.create({
  baseURL: 'http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/',
});

const instanceCustomer = axios.create({
  baseURL: 'http://ec2-44-201-171-84.compute-1.amazonaws.com:4005/',
});

const instanceAdmin = axios.create({
  baseURL: SERVER_URL_ADMIN,
});

const excludedUrls = ['customerLogin', 'customerSignup'];

instanceUser.interceptors.request.use(async function (config) {
  config.timeoutErrorMessage = 'Request Timed Out';
  console.log('Sending Request', config.url);
  if (
    !excludedUrls.includes(config.url)
  ) {
    console.log('if')
    let userData = await AsyncStorage.getItem(userKey);
    const parsedUser: IUserSessionData = JSON.parse(userData!);
    config.headers = {Authorization: 'Bearer ' + parsedUser.token};
  }

  console.log(JSON.stringify(config))
  return config;
});

instanceCustomer.interceptors.request.use(async function (config) {
  config.timeoutErrorMessage = 'Request Timed Out';
  console.log('here it issss')
  console.log(config.url)
  if (
    !excludedUrls.includes(config.url)
  ) {
    console.log('if')
    let userData = await AsyncStorage.getItem(userKey);
    const parsedUser: IUserSessionData = JSON.parse(userData!);
    config.headers = {Authorization: 'Bearer ' + parsedUser.token};
  }
  return config;
});

instanceAdmin.interceptors.request.use(async function (config) {
  config.timeoutErrorMessage = 'Request Timed Out';
  console.log('Sending Request', config.url);
  if (
    config.baseURL === SERVER_URL_ADMIN &&
    !excludedUrls.includes(config.url!)
  ) {
    let userData = await AsyncStorage.getItem(userKey);
    const parsedUser: IUserSessionData = JSON.parse(userData!);
    config.headers = {Authorization: 'Bearer ' + parsedUser.token};
  }
  return config;
});

export {
  instanceUser as httpUser,
  instanceCustomer as httpCustomer,
  instanceAdmin as httpAdmin,
};
