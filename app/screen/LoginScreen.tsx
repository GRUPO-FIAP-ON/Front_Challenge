import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTheme } from '../context/ThemeContext';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isDarkTheme } = useTheme();

  const handleLogin = () => {
    // Lógica de autenticação
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#FFFFFF' }]}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={[styles.title, { color: isDarkTheme ? '#FFFFFF' : '#000' }]}>Acessar Conta</Text>

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
          <Text style={[styles.forgotPasswordLink, { color: isDarkTheme ? '#FFFFFF' : '#8172E8' }]}>
            Esqueceu a sua senha?
          </Text>
        </TouchableOpacity>
      </View>

      <Button title="Entrar" onPress={handleLogin} />

      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={[styles.registerLink, { color: isDarkTheme ? '#FFFFFF' : '#8172E8' }]}>
            Cadastre-se
          </Text>
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
    fontSize: 16,
    fontFamily: 'Ubuntu_400Regular',
    padding: 5,
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerLink: {
    fontSize: 16,
    fontFamily: 'Ubuntu_400Regular',
    padding: 5,
  },
});

export default LoginScreen;