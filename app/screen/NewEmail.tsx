import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext'; // Ajuste o caminho conforme necessário

const { height } = Dimensions.get('window');

interface NewEmailProps {
  onClose: () => void;
}

const NewEmail: React.FC<NewEmailProps> = ({ onClose }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');

  const { isDarkTheme } = useTheme();

  const handleSend = () => {
    // Lógica de envio do e-mail
    console.log("E-mail enviado:", { to, subject, email });
  };

  return (
    <View style={[styles.newEmailContainer, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.newEmailTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>Nova Mensagem</Text>
        <TouchableOpacity style={[styles.closeButton, { backgroundColor: isDarkTheme ? '#f44336' : '#f44336' }]} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, { borderBottomColor: isDarkTheme ? '#666' : '#ccc' }]}
        placeholder="Para"
        placeholderTextColor={isDarkTheme ? '#bbb' : '#666'}
        value={to}
        onChangeText={setTo}
      />
      <TextInput
        style={[styles.input, { borderBottomColor: isDarkTheme ? '#666' : '#ccc' }]}
        placeholder="Assunto"
        placeholderTextColor={isDarkTheme ? '#bbb' : '#666'}
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={[styles.EmailInput, { borderColor: isDarkTheme ? '#666' : '#ccc', color: isDarkTheme ? '#fff' : '#000' }]}
        placeholder="Mensagem"
        placeholderTextColor={isDarkTheme ? '#bbb' : '#666'}
        value={email}
        onChangeText={setEmail}
        multiline
      />
      <Button title="Enviar" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  newEmailContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.7, // 70% da altura da tela
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10, 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  newEmailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  EmailInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    height: 200,
    textAlignVertical: 'top',
  },
});

export default NewEmail;
