import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface InputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  onShowPassword?: () => void;
  onChangeText?: (text: string) => void; 
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  secureTextEntry = false,
  showPassword = false,
  onShowPassword,
  onChangeText,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor="#000" 
          onChangeText={onChangeText} 
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={onShowPassword} style={styles.eyeIconContainer}>
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginBottom: 5,
    color: '#777777',
    marginLeft: 15,
  },
  input: {
    height: 55,
    borderColor: '#777777',
    borderWidth: 1,
    borderRadius: 25, 
    paddingHorizontal: 10,
    color: '#000000', 
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 15, 
  },
});

export default Input;
