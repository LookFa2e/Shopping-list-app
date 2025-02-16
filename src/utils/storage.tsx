import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShoppingList } from "../types";

const STORAGE_KEY = "shopping_lists";

export const loadLists = async (setLists: (lists: ShoppingList[]) => void) => {
  try {
    const savedLists = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  } catch (error) {
    console.error("Błąd ładowania list:", error);
  }
};

export const saveLists = async (lists: ShoppingList[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  } catch (error) {
    console.error("Błąd zapisywania list:", error);
  }
};