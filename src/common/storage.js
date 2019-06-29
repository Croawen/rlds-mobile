import { AsyncStorage } from "react-native";
export const CURRENT_USER = "CURRENT_USER";

export const setCurrentUser = async user => {
  await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
};

export const getCurrentUser = async () => {
  return JSON.parse(await AsyncStorage.getItem(CURRENT_USER));
};

export const clearCurrentUser = async () => {
  await AsyncStorage.removeItem(CURRENT_USER);
};
