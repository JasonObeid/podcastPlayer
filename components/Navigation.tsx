import * as React from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
} from '@react-navigation/native';
import {BottomTabView} from '@react-navigation/bottom-tabs';
import Player from './Player';
import {View} from './Themed';

function BottomTabNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  ...rest
}) {
  const {state, descriptors, navigation} = useNavigationBuilder(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });

  return (
    <View>
      <Player />
      <BottomTabView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </View>
  );
}

export default createNavigatorFactory(BottomTabNavigator);
