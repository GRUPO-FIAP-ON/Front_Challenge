import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button'; 
import Input from '../components/Input';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // lógica de autenticação
    navigation.navigate('Inbox');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          //source={require('/assets/images/logo.jpeg')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Acessar Conta</Text>

      <Input 
        label="E-mail"
        placeholder="Digite seu e-mail"
        onShowPassword={() => {}}
        showPassword={false}
        secureTextEntry={false}
        onChangeText={setEmail}
      /> 
      
      <Input 
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry
        showPassword={false}
        onShowPassword={() => {}}
        onChangeText={setPassword}
      />

      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => console.log("Redefinir senha")}>
          <Text style={styles.forgotPasswordLink}>Esqueceu a sua senha?</Text>
        </TouchableOpacity>
      </View>

      <Button title="Entrar" onPress={handleLogin} />

      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100, 
    height: 100, 
  },
  title: {
    fontSize: 39,
    fontFamily: 'Ubuntu_700Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordLink: {
    color: '#8172E8',
    fontSize: 16,
    fontFamily: 'Roboto',
    padding: 5,
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerLink: {
    color: '#8172E8',
    fontSize: 16,
    fontFamily: 'Roboto',
    padding: 5,
  },
});

export default LoginScreen;
