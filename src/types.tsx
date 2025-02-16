import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Addlist: { 
    listIndex: number; 
    lists: ShoppingList[]; 
    setLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>; 
  };
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
export type AddlistScreenNavigationProp = StackNavigationProp<RootStackParamList, "Addlist">;
export type AddlistScreenRouteProp = RouteProp<RootStackParamList, "Addlist">;

export interface ShoppingList {
  name: string;
  items: ShoppingItem[];
}

export interface ShoppingItem {
  name: string;
  checked: boolean;
}

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export interface AddlistScreenProps {
  route: AddlistScreenRouteProp;
  navigation: AddlistScreenNavigationProp;
}
