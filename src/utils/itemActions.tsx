import { Alert } from "react-native";
import { ShoppingList } from "../types";

export const addItemToList = (
  newItem: string,
  currentList: ShoppingList,
  lists: ShoppingList[],
  setLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>,
  listIndex: number,
  navigation: any
) => {
  if (newItem.trim()) {
    const updatedList = { ...currentList, items: [...currentList.items, { name: newItem.trim(), checked: false }] };
    const updatedLists = [...lists];
    updatedLists[listIndex] = updatedList;
    setLists(updatedLists);
    navigation.setParams({ lists: updatedLists });
  }
};

export const deleteItem = (
  index: number,
  currentList: ShoppingList,
  lists: ShoppingList[],
  setLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>,
  listIndex: number,
  navigation: any
) => {
  Alert.alert("Usuń produkt", "Czy na pewno chcesz usunąć ten produkt?", [
    { text: "Anuluj", style: "cancel" },
    {
      text: "Usuń",
      onPress: () => {
        const updatedItems = currentList.items.filter((_, i) => i !== index);
        const updatedList = { ...currentList, items: updatedItems };
        const updatedLists = [...lists];
        updatedLists[listIndex] = updatedList;
        setLists(updatedLists);
        navigation.setParams({ lists: updatedLists });
      },
    },
  ]);
};

export const toggleChecked = (
  index: number,
  currentList: ShoppingList,
  lists: ShoppingList[],
  setLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>,
  listIndex: number,
  navigation: any
) => {
  const updatedItems = [...currentList.items];
  updatedItems[index] = { ...updatedItems[index], checked: !updatedItems[index].checked };

  const updatedList = { ...currentList, items: updatedItems };
  const updatedLists = [...lists];
  updatedLists[listIndex] = updatedList;
  setLists(updatedLists);
  navigation.setParams({ lists: updatedLists });
};