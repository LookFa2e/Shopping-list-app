import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  itemRow: { flexDirection: "row", alignItems: "center", paddingVertical: 5 },
  itemText: { fontSize: 18, flex: 1 },
  checkedItem: { textDecorationLine: "line-through", color: "#a9a9a9" },
  deleteText: { fontSize: 20, color: "red" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
});