import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ArchiveScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Arquivo Morto</Text>
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
    fontFamily: 'Ubuntu_700Bold',
  },
});

export default ArchiveScreen;
