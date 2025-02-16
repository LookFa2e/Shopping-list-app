import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import AddlistScreen from '../screens/AddlistScreen'; 

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen as React.ComponentType<any>} options={{title: "Twoje Listy"}} />
        <Stack.Screen name="Addlist"component={AddlistScreen as React.ComponentType<any>} options={{title: "Lista"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
