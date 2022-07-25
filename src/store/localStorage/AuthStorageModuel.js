import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorageConfig from './localStorageConfig';

export default {
  //GET
  _getItemAutoLogin: async () => {
    const key = localStorageConfig.key.AUTO_LOGIN;
    const data = await AsyncStorage.getItem(key);
    return data;
  },
  _getItemLoginType: async () => {
    const key = localStorageConfig.key.LOGIN_TYPE;
    const data = await AsyncStorage.getItem(key);
    return data;
  },
  _getItemUserToken: async () => {
    const key = localStorageConfig.key.USER_TOKEN;
    const data = await AsyncStorage.getItem(key);
    return data;
  },
  _getItemUserId: async () => {
    const key = localStorageConfig.key.USER_ID;
    const data = await AsyncStorage.getItem(key);
    return data;
  },

  // SET
  _setItemAutoLogin: async value => {
    const key = localStorageConfig.key.AUTO_LOGIN;
    const data = await AsyncStorage.setItem(key, value);
    return data;
  },
  _setItemLoginType: async value => {
    const key = localStorageConfig.key.LOGIN_TYPE;
    const data = await AsyncStorage.setItem(key, value);
    return data;
  },
  _setItemUserToken: async value => {
    const key = localStorageConfig.key.USER_TOKEN;
    const data = await AsyncStorage.setItem(key, value);
    return data;
  },
  _setItemUserId: async value => {
    const key = localStorageConfig.key.USER_ID;
    const data = await AsyncStorage.setItem(key, value);
    return data;
  },
  //REMOVE
  _removeItemAutoLogin: async callback => {
    const key = localStorageConfig.key.AUTO_LOGIN;
    const data = await AsyncStorage.removeItem(key, callback);
    return data;
  },
  _removeUserTokenID: async callback => {
    const key = localStorageConfig.key.USER_ID;
    const key2 = localStorageConfig.key.USER_TOKEN;
    const key3 = localStorageConfig.key.LOGIN_TYPE;
    const data = await AsyncStorage.removeItem(key, callback);
    const data2 = await AsyncStorage.removeItem(key2, callback);
    const data3 = await AsyncStorage.removeItem(key3, callback);
    return [data, data2];
  },
};
