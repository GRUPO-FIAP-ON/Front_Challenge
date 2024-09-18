import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  isLoading?: boolean; 
}

const Button: React.FC<ButtonProps> = ({ title, onPress, color = '#5138EE', isLoading = false }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      {
        !isLoading ? (
          <Text style={styles.text}>{title}</Text>
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        ) 
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5138EE', 
    display: 'flex',
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
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
