import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { styles } from '../styles/LoginInput.styles'; // Importando os estilos

interface LoginInputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const LoginInput: React.FC<LoginInputProps> = ({ label, placeholder, secureTextEntry = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default LoginInput;
