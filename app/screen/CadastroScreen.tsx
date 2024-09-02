import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

const CadastroScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = () => {
    // Adicione aqui a lógica de autenticação
    navigation.navigate('Inbox');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>

      <Input 
        label="Nome Completo"
        placeholder="Digite seu Nome Completo"
        onShowPassword={() => {}}
        showPassword={false}
        secureTextEntry={false}
        onChangeText={setEmail}
      /> 
      
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
        showPassword={showPassword}
        onShowPassword={() => setShowPassword(!showPassword)}
        onChangeText={setPassword}
      />

      <Input 
        label="Confirmar Senha"
        placeholder="Digite sua senha novamente"
        secureTextEntry
        showPassword={showPassword}
        onShowPassword={() => setShowPassword(!showPassword)}
        onChangeText={setPassword}
      />

      <Button title="Cadastrar-se" onPress={handleCadastro} />

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

  registerContainer: {
    alignItems: 'center',
  },
  registerLink: {
    color: '#8172E8',
    fontSize: 20,
    fontFamily: 'Roboto',
    padding: 5,
  },
});

export default CadastroScreen;
