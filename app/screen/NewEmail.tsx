import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import Button from '../components/Button';

const { height } = Dimensions.get('window');

interface NewEmailProps {
  onClose: () => void;
}

const NewEmail: React.FC<NewEmailProps> = ({ onClose }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [Email, setEmail] = useState('');

  const handleSend = () => {
    // Lógica de envio do e-mail
    console.log("E-mail enviado:", { to, subject, Email });
  };

  return (
    <View style={styles.newEmailContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.newEmailTitle}>Nova Mensagem</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Para"
        value={to}
        onChangeText={setTo}
      />
      <TextInput
        style={styles.input}
        placeholder="Assunto"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.EmailInput}
        placeholder="Mensagem"
        value={Email}
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
    backgroundColor: '#fff',
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
    backgroundColor: '#f44336',
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
    borderBottomColor: '#ccc',
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  EmailInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    height: 200,
    textAlignVertical: 'top',
  },
});

export default NewEmail;
