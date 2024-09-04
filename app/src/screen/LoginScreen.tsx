import React from 'react';
import { View, Text } from 'react-native';
import LoginInput from '../components/LoginInput';
import Button from '../components/Button';
import Link from '../components/Link';
import { styles } from '../styles/LoginScreen.styles'; // Importando os estilos

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const handleLogin = () => {
    // Lógica de autenticação
    navigation.navigate('Inbox');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acessar conta</Text>
      <LoginInput label="E-mail" placeholder="Digite seu e-mail" />
      <LoginInput label="Senha" placeholder="Digite sua senha" secureTextEntry />
      <Link title="Esqueceu a sua senha?" onPress={() => console.log("Redefinir senha")} style={styles.link} />
      <Button title="Entrar" onPress={handleLogin} />
      <Link title="Cadastre-se" onPress={() => console.log("Cadastrar usuário")} style={styles.link} />
    </View>
  );
};

export default LoginScreen;
