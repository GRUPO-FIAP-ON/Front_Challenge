import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmailDeletedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Emails Excluídos</Text>
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

export default EmailDeletedScreen;
