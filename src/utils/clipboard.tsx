import * as Clipboard from 'expo-clipboard';
import { ShoppingList } from "../types";

export const parseListFromText = (content: string): ShoppingList[] => {
  const lines = content.split("\n");
  let listName = lines[0].trim();
  listName = listName.replace(/:$/, '').trim();
  
  if (!listName) {
    listName = "Zaimportowana lista";
  }

  const items = lines.slice(1).map((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine === "") {
      return null; 
    }

    const checked = trimmedLine.startsWith("✅");
    const name = trimmedLine.replace("✅", "").replace("🔳", "").trim();

    if (name.length > 0) {
      return { name, checked }; 
    }

    return null;
  }).filter(item => item !== null); 

  return [{ name: listName, items }];
};

export const handlePaste = async (setLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>, setShowImportModal: (visible: boolean) => void) => {
  try {
    const content = await Clipboard.getStringAsync();
    console.log("Zawartość schowka:", content);

    if (content) {
      const listData = parseListFromText(content);
      setLists((prevLists) => [...prevLists, ...listData]);
      setShowImportModal(false);
    } else {
      console.error("Schowek jest pusty.");
      alert("Nie znaleziono danych w schowku.");
    }
  } catch (error) {
    console.error("Błąd przy wklejaniu:", error);
    alert("Nie udało się wczytać danych ze schowka.");
  }
};
