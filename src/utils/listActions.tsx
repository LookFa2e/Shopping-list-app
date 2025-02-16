import { Alert, Share } from "react-native";
import { ShoppingList } from "../types";

export const addList = (newListName: string, lists: ShoppingList[], setLists: (lists: ShoppingList[]) => void) => {
  if (newListName.trim()) {
    const updatedLists = [...lists, { name: newListName, items: [] }];
    setLists(updatedLists);
  }
};

export const deleteList = (index: number, lists: ShoppingList[], setLists: (lists: ShoppingList[]) => void) => {
  Alert.alert("Usuń listę", "Czy na pewno chcesz usunąć tę listę?", [
    { text: "Anuluj", style: "cancel" },
    { text: "Usuń", onPress: () => setLists(lists.filter((_, i) => i !== index)) },
  ]);
};

export const shareList = (list: ShoppingList, setShowShareModal: (visible: boolean) => void) => {
  const message = `${list.name}:\n` +
    list.items.map(item => `${item.checked ? "✅" : "🔳"} ${item.name}`).join("\n");

  Share.share({ message })
    .then(() => setShowShareModal(false))
    .catch((err) => console.error("Błąd przy udostępnianiu:", err));
};


