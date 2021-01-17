import React, {useEffect, useState} from 'react';
import {Text, Button, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Player from './Player';
import Feeds from './Feeds';
import Subscriptions from './Subscriptions';
import Search from './Search';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default class CustomNavigator extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Player />
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Search') {
                  iconName = focused
                    ? 'search-circle'
                    : 'search-circle-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                } else if (route.name === 'Feed') {
                  iconName = focused
                    ? 'caret-down-circle'
                    : 'caret-down-circle-outline';
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
            <Tab.Screen name="Settings" component={Player} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
