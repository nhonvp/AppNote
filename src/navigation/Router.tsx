import React from 'react';
import { NavigationContainer, StackActionHelpers } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from 'views/LoginScreen';
import Home from 'views/HomeScreen';


const Stack  = createNativeStackNavigator();

const Router = () => {
   return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
         <Stack.Screen  name='Login' component={Home}/>
         <Stack.Screen name='Home' component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
   )
}

export default Router;