import React from 'react';
import { View, StyleSheet } from 'react-native';
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
});

export default LoginScreen;
