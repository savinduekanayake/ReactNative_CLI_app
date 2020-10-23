/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabScreen from './screens/MainTabsScreen';
import { DrawerContent } from './screens/DraweContent';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  // for authentication
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  // --------------------Authentication start------------------
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userName : null
  };

  const loginReducer = (prevState,action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);



  const authContext = React.useMemo(() => ({
    signIn: async(userName, password) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      let userToken;
      userToken = null;
      if(userName === 'user' && password === 'pass') {
        userToken = 'dfgh';
        try{
          // use Async storage
          await AsyncStorage.setItem('userToken', userToken)
        } catch(e) {
          console.log(e);
        }
      }
      console.log('user token', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken })
    },

    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try{
        // use Async storage
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' })
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      // dispatch({ type: 'LOGIN', id: userName, token: userToken })
    }
  }), []);

  // when screen is loaded firstime set a timeout
  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken= null;
      try{
        // use Async storage
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIVE_TOKEN', toke: userToken })
    }, 1000)
  }, [])

    // --------------------Authentication end-------------

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // passing authContext value 
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          //adding content to drawer by drawerContainer 
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="Support" component={SupportScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
          </Drawer.Navigator>
        )
          :
          <RootStackScreen />
        }

      </NavigationContainer>
    </AuthContext.Provider>
  )
}


export default App;
