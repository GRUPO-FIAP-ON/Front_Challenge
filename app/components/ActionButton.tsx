import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const ActionButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    borderRadius: 50,
    padding: 20,
  },
  plus: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ActionButton;
