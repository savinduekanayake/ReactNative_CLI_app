import React from 'react';
import {View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        <Button
          title="Click here"
          onPress={() => alert("Cliked!")}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    }
  })

  export default ProfileScreen;