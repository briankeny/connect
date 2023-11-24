import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveString = async (key:any, value:any) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const save = async (key:String, value:any) =>
  saveString(key, JSON.stringify(value));

export const get = async (key:any) => {
  try {
    const itemString = await AsyncStorage.getItem(key);
    if (itemString) {
      return JSON.parse(itemString);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const removeFromStorage = async (key:any) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};
