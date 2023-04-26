import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalStorage = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  } catch (err) {
    customToast('مشکلی در ارتباط با دیتابیس پیش آمده است');
  }
};

export const getLocalStorage = async name => {
  try {
    const value = await AsyncStorage.getItem(name);
    return JSON.parse(value);
  } catch (err) {
    customToast('مشکلی در ارتباط با دیتابیس پیش آمده است');
  }
};

export const removeLocalStorage = async name => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (err) {
    customToast('مشکلی در ارتباط با دیتابیس پیش آمده است');
  }
};

export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    customToast('مشکلی در ارتباط با دیتابیس پیش آمده است');
  }
};
