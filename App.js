/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabScreen from './screens/MainTabsScreen';
import {DrawerContent} from './screens/DraweContent';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarksScreen from './screens/BookmarksScreen';

import RootStackScreen from './screens/RootStackScreen';

const Drawer = createDrawerNavigator();
 
const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />

      {/* adding content to drawer by drawerContainer */}
      {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="Support" component={SupportScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>

  )
}


export default App;
