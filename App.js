import React, { useEffect, useState } from 'react';
import { Text, Button, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Player from './components/Player';
import Feeds from './components/Feeds';
import Subscriptions from './components/Subscriptions';
import Search from './components/Search';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Feeds" component={Feeds} />
      <Tab.Screen name="Subscriptions" component={Subscriptions} />
      <Tab.Screen name="Settings" component={Search} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;
