import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

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
  const { isDarkTheme } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: isDarkTheme ? '#FFFFFF' : '#777777' }]}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { color: isDarkTheme ? '#FFFFFF' : '#000000', borderColor: isDarkTheme ? '#777777' : '#777777' }]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor={isDarkTheme ? '#888888' : '#777777'} 
          onChangeText={onChangeText} 
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={onShowPassword} style={styles.eyeIconContainer}>
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={isDarkTheme ? '#FFFFFF' : '#000000'}
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
    marginLeft: 15,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderRadius: 25, 
    paddingHorizontal: 10,
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