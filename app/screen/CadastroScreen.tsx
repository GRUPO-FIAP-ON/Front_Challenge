import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTheme } from '../context/ThemeContext';
import { showMessage } from 'react-native-flash-message';

const CadastroScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { isDarkTheme } = useTheme();

  const handleCadastro = async () => {
    if (password !== confirmPassword) {
      showMessage({
        message: "Erro",
        description: "As senhas devem ser iguais.",
        type: "danger",
      });
      return;
    }

    if (!password || !fullName || !username) {
      showMessage({
        message: "Erro",
        description: "Todos os campos são obrigatórios.",
        type: "danger",
      });
      return;
    }

    const userData = {
      fullName,
      username,
      password
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.status === 201) {
        showMessage({
          message: "Sucesso",
          description: "Usuário cadastrado com sucesso!",
          type: "success",
        });
        
        navigation.navigate('Inbox');
      } else {
        showMessage({
          message: "Erro",
          description: data.error || "Falha ao cadastrar o usuário.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      
      showMessage({
        message: "Erro",
        description: "Erro ao comunicar-se com o servidor.",
        type: "danger",
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#FFFFFF' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#FFFFFF' : '#000' }]}>Cadastre-se</Text>

      <Input 
        label="Nome Completo"
        placeholder="Digite seu Nome Completo"
        onChangeText={setFullName}
      /> 
      
      <Input 
        label="Usuário"
        placeholder="Digite seu usuário"
        onChangeText={setUsername}
      /> 
      
      <Input 
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry
        showPassword={showPassword}
        onShowPassword={() => setShowPassword(!showPassword)}
        onChangeText={setPassword}
      />

      <Input 
        label="Confirmar Senha"
        placeholder="Digite a senha novamente"
        secureTextEntry
        showPassword={showPassword}
        onShowPassword={() => setShowPassword(!showPassword)}
        onChangeText={setConfirmPassword}
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 39,
    fontFamily: 'Ubuntu_700Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CadastroScreen;
