import AsyncStorage from "@react-native-async-storage/async-storage";

import { customToast } from "./../toastMessage/toastMessage";

export const setAsyncStorage = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  } catch (err) {
    customToast("مشکلی در ارتباط با دیتابیس پیش آمده است");
  }
};

export const getAsyncStorage = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    return JSON.parse(value);
  } catch (err) {
    customToast("مشکلی در ارتباط با دیتابیس پیش آمده است");
  }
};

export const removeAsyncStorage = async (name) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (err) {
    customToast("مشکلی در ارتباط با دیتابیس پیش آمده است");
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    customToast("مشکلی در ارتباط با دیتابیس پیش آمده است");
  }
};
