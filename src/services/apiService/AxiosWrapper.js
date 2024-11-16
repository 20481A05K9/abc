import axios from 'axios';
import {BASE_URL, TIMEOUT} from '../config/index.url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAxiosInstance = async () => {
  let userToken = await AsyncStorage.getItem('token');

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: userToken
      ? {
          'Content-Type': 'application/json',
          Authorization: userToken,
        }
      : {
          'content-type': 'application/json',
        },
  });

  return instance;
};

export const getAxiosInstanceAddLocation = async jsonRequest => {
  let userToken = await AsyncStorage.getItem('token');

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: userToken
      ? {
          'Content-Type': 'application/json',
          Authorization: userToken,
        }
      : {
          'content-type': 'application/json',
          Authorization: jsonRequest?.TOKEN,
        },
  });

  return instance;
};

export const getAxiosInstancePdfUpload = async () => {
  let userToken = await AsyncStorage.getItem('token');

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: userToken,
    },
  });

  return instance;
};
