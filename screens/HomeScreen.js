import React from 'react';
import {View, Text, Button, StatusBar } from 'react-native';

import {useTheme} from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {

    // to change the color of theme
    const { colors } = useTheme();

    const theme = useTheme()

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar barStyle={theme.dark? "light-content" : "dark-content"} />
        <Text>Home Screen</Text>
        <Button
          title="Go todetails screen"
          onPress={() => navigation.navigate("Details")}
        />
      </View>
    );
  };

  export default HomeScreen;