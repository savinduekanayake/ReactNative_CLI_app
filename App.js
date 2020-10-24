/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';

import { 
  NavigationContainer, 
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
 } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';

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

  const  [isDarkTheme, setIsDarkTheme] = React.useState(false);

// ----------Theme-------------
const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#ffffff',
    text: '#333333'
  }
}

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#333333',
    text: '#ffffff'
  }
}

const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;


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
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);

      const userToken =  String(foundUser[0].userToken);
      const userName =  foundUser[0].userName;

      // if(userName === 'user' && password === 'pass') {
        // userToken = 'dfgh';
        try{
          // use Async storage
          await AsyncStorage.setItem('userToken', userToken)
        } catch(e) {
          console.log(e);
        }
      // }
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
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
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
        // console.log(userToken)
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIVE_TOKEN', token: userToken })
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
    // for dark theme for (react-native-paper) wrap all things from paper provider
    <PaperProvider theme={theme} >
    {/* passing authContext value  */}
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
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
    </PaperProvider>
  )
}


export default App;
