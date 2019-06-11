import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MakeAreaScreen from '../screens/MakeAreaScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-home"
    />
  ),
};

const MakeAreaStack = createStackNavigator({
  MakeArea: MakeAreaScreen,
});

MakeAreaStack.navigationOptions = {
  tabBarLabel: 'Make Area',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-add-circle-outline"
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MakeAreaStack,
  SettingsStack,
});
