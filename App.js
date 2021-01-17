import React from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Text,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconRegistry,
} from '@ui-kitten/components';
import {View, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Player from './components/Player';
import Feeds from './components/Feeds';
import Subscriptions from './components/Subscriptions';
import Search from './components/Search';

const {Navigator, Screen} = createBottomTabNavigator();

const SearchIcon = props => <Icon {...props} name="settings" />;
const FeedsIcon = props => <Icon {...props} name="settings" />;
const SubscriptionsIcon = props => <Icon {...props} name="settings" />;
const SettingsIcon = props => <Icon {...props} name="settings" />;

const BottomTabBar = ({navigation, state}) => (
  <React.Fragment>
    <Player></Player>
    <BottomNavigation selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="SEARCH" icon={SearchIcon} />
      <BottomNavigationTab title="FEED" icon={FeedsIcon} />
      <BottomNavigationTab title="SUBSCRIPTIONS" icon={SubscriptionsIcon} />
      <BottomNavigationTab title="SETTINGS" icon={SettingsIcon} />
    </BottomNavigation>
  </React.Fragment>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="SEARCH" component={Search} />
    <Screen name="FEED" component={Feeds} />
    <Screen name="SUBSCRIPTIONS" component={Subscriptions} />
    <Screen name="SETTINGS" component={Search} />
  </Navigator>
);

export default () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  </React.Fragment>
);
