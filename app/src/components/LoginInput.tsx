import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

interface LoginInputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const LoginInput: React.FC<LoginInputProps> = ({ label, placeholder, secureTextEntry = false }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});

export default LoginInput;
