import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ExploreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>
      <Button
        title="Click here"
        onPress={() => alart('Button clicked!')}
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

export default ExploreScreen;