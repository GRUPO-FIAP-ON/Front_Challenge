import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SpamScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lixo Eletrônico</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default SpamScreen;
