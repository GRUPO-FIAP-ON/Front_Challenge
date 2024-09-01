import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string; 
}

const Button: React.FC<ButtonProps> = ({ title, onPress, color = '#5138EE' }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5138EE', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    height:50,
    marginBottom: 20, 
  },
  text: {
    color: '#FFF', 
    fontSize: 16,
    fontFamily: 'Roboto', 
    fontWeight: 'bold',
  },
});

export default Button;
