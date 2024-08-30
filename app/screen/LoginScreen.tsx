import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoginInput from '../components/LoginInput';
import Button from '../components/Button';
import Link from '../components/Link';

interface LoginScreenProps {
  navigation: any; // Tipo genérico para a navegação
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const handleLogin = () => {
    // Aqui você pode adicionar a lógica para autenticação
    // Navegar para a tela "Inbox" após login
    navigation.navigate('Inbox');
  };

  return (
    <View style={styles.container}>
      {/* Espaço para o logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} // Aqui você pode adicionar o caminho para a imagem do seu logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Texto "Acessar Conta" */}
      <Text style={styles.title}>Acessar Conta</Text>

      <LoginInput label="E-mail" placeholder="Digite seu e-mail" />
      <LoginInput label="Senha" placeholder="Digite sua senha" secureTextEntry />
      <Link title="Esqueceu a sua senha?" onPress={() => console.log("Redefinir senha")} />
      <Button title="Entrar" onPress={handleLogin} />
      <Link title="Cadastre-se" onPress={() => console.log("Cadastrar usuário")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20, // Espaço abaixo do logo
  },
  logo: {
    width: 150,  // Ajuste o tamanho conforme necessário
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // Espaço entre o título e o próximo elemento
  },
});

export default LoginScreen;
