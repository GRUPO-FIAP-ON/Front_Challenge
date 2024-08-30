import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LoginInputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const LoginInput: React.FC<LoginInputProps> = ({ label, placeholder, secureTextEntry = false }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={isPasswordVisible}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons 
              name={isPasswordVisible ? 'eye-off' : 'eye'} 
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  input: {
    flex: 1,
  },
});

export default LoginInput;
