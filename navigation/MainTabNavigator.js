import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import RecordsScreen from '../screens/RecordsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const GameStack = createStackNavigator({
  Game: GameScreen,
});

GameStack.navigationOptions = {
  tabBarLabel: 'Game',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'}
    />
  ),
};

const RecordsStack = createStackNavigator({
  Records: RecordsScreen,
});

RecordsStack.navigationOptions = {
  tabBarLabel: 'Records',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  GameStack,
  RecordsStack,
});
