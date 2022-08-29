import React from 'react';
import {
  NavigationContainer,
  StackActionHelpers,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from 'views/LoginScreen';
import Home from 'views/HomeScreen';
import BottomBar from './BottomBar';
import Register from 'views/RegisterScreen';

export type RootStackParamList  = {
  Login : undefined,
  Register : undefined,
  BottomBar : undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomBar"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomBar" component={BottomBar} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
