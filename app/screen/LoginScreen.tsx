import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTheme } from '../context/ThemeContext';
import { showMessage } from 'react-native-flash-message';
import { saveSessionData } from '../services/sessionStorage';
import { useSession } from '../context/SessionContext';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkTheme } = useTheme();
  const { setUser } = useSession();

  const handleLogin = async () => {
    if (!username || !password) {
      showMessage({
        message: "Erro",
        description: "Todos os campos são obrigatórios.",
        type: "danger",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        await saveSessionData('authData', JSON.stringify(data));
        setUser(data);
        
        navigation.navigate('Home');
      } else {
        showMessage({
          message: "Erro",
          description: data.error || "Falha ao realizar o login.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      
      showMessage({
        message: "Erro",
        description: "Erro ao comunicar-se com o servidor.",
        type: "danger",
      });
    }
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
