import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import CheckBox from "react-native-check-box";
import { ShoppingList, AddlistScreenProps } from "../types";
import { styles } from "../styles/addList";
import { loadLists, saveLists } from "../utils/storage"; 
import { addItemToList, deleteItem, toggleChecked } from "../utils/itemActions"; 

const AddlistScreen: React.FC<AddlistScreenProps> = ({ route, navigation }) => {
  const { listIndex, lists, setLists } = route.params;
  const [newItem, setNewItem] = useState("");
  const [currentList, setCurrentList] = useState<ShoppingList>(lists[listIndex]);

  useEffect(() => {
    setCurrentList(lists[listIndex]);
  }, [lists, listIndex]);

  useEffect(() => {
    saveLists(lists); 
  }, [lists]);

  const handleAddItem = () => {
    addItemToList(newItem, currentList, lists, setLists, listIndex, navigation); 
    setNewItem("");
  };

  const handleDeleteItem = (index: number) => {
    deleteItem(index, currentList, lists, setLists, listIndex, navigation); 
  };

  const handleToggleChecked = (index: number) => {
    toggleChecked(index, currentList, lists, setLists, listIndex, navigation); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{currentList.name} :</Text>

      <FlatList
        data={currentList.items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemRow}>
            <CheckBox isChecked={item.checked} onClick={() => handleToggleChecked(index)} />
            <Text style={[styles.itemText, item.checked && styles.checkedItem]}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteItem(index)}>
              <Text style={styles.deleteText}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TextInput style={styles.input} placeholder="Dodaj produkt..." value={newItem} onChangeText={setNewItem} />
      <Button title="Dodaj produkt" onPress={handleAddItem} />
    </View>
  );
};

export default AddlistScreen;
