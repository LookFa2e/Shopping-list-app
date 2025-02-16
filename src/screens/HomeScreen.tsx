import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal } from "react-native";
import { ShoppingList, HomeScreenProps } from "../types";
import { loadLists, saveLists } from "../utils/storage"; 
import { parseListFromText, handlePaste } from "../utils/clipboard";
import { addList, deleteList, shareList } from "../utils/listActions";
import { styles } from "../styles/home";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedText, setImportedText] = useState<string>("");

  useEffect(() => {
    loadLists(setLists);  // Ładowanie list z AsyncStorage
  }, []);

  useEffect(() => {
    saveLists(lists);  // Zapisujemy zmiany do AsyncStorage
  }, [lists]);

  const handleAddList = () => {
    addList(newListName, lists, setLists); 
    setNewListName("");
    setShowModal(false);
  };

  const handleDeleteList = (index: number) => {
    deleteList(index, lists, setLists); 
  };

  const handleShareList = (list: ShoppingList) => {
    shareList(list, setShowShareModal); 
  };

  const handlePasteList = () => {
    handlePaste(setLists, setShowImportModal); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wybierz listę</Text>

      {/* Jeśli nie ma żadnych list, wyświetl komunikat */}
      {lists.length === 0 ? (
        <View>
          <Text style={styles.noListsText}>Niestety nie masz jeszcze lisy. Ale możesz dodać nową!</Text>
          <Text style={styles.downArrowIcon}>👇🏿</Text>
        </View>
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listRow}>
              <TouchableOpacity
                style={styles.listButton}
                onPress={() => navigation.navigate("Addlist", { listIndex: index, lists, setLists })}
              >
                <Text style={styles.listText}>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteList(index)}>
                <Text style={styles.deleteText}>🗑</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.floatingButtonRight} onPress={() => setShowModal(true)}>
        <Text style={styles.plusIcon}>➕</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.floatingButtonLeft} onPress={() => setShowShareModal(true)}>
        <Text style={styles.plusIcon}>🔗</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.floatingButtonLeftUp} onPress={() => setShowImportModal(true)}>
        <Text style={styles.plusIcon}>📥</Text>
      </TouchableOpacity>

      {/* Modal for adding new list */}
      <Modal visible={showModal} animationType="slide" transparent onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nowa lista..."
              value={newListName}
              onChangeText={setNewListName}
            />
            <Button title="Dodaj listę" onPress={handleAddList} />
            <Button title="Anuluj" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for sharing lists */}
      <Modal visible={showShareModal} animationType="slide" transparent onRequestClose={() => setShowShareModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18 }}>Wybierz listę do udostępnienia</Text>
            <FlatList
              data={lists}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listButton} onPress={() => handleShareList(item)}>
                  <Text style={styles.listText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Anuluj" onPress={() => setShowShareModal(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for pasting list from clipboard */}
      <Modal visible={showImportModal} animationType="slide" transparent onRequestClose={() => setShowImportModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Wklej listę z wiadomości lub schowka</Text>
            <TextInput
              style={styles.input}
              value={importedText}
              multiline
              onChangeText={setImportedText}
            />
            <Button title="Importuj listę" onPress={handlePasteList} />
            <Button title="Anuluj" onPress={() => setShowImportModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
