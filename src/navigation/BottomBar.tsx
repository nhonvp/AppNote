import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from 'views/HomeScreen';
import Settings from 'views/Settings';
import React from 'react';


export type ParamList = {
  Home: undefined;
  Setting: undefined;
};

const Tab = createBottomTabNavigator<ParamList>();

const BottomBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Setting" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomBar;
