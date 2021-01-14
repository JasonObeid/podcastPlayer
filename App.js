import React, { useEffect, useState } from 'react';
import { Text, Button, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Player from './components/Player';
import Feeds from './components/Feeds';
import Subscriptions from './components/Subscriptions';
import Search from './components/Search';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Search') {
              iconName = focused ? 'search-circle' : 'search-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Feed') {
              iconName = focused ? 'albums' : 'albums-outline';
            } else if (route.name === 'Subscriptions') {
              iconName = focused ? 'albums' : 'albums-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Feed" component={Feeds} />
        <Tab.Screen name="Subscriptions" component={Subscriptions} />
        <Tab.Screen name="Settings" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
