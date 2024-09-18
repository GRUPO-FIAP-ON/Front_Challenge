import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext'; // Ajuste o caminho conforme necessário
import { showMessage } from 'react-native-flash-message';
import { useSession } from '../context/SessionContext';

const { height } = Dimensions.get('window');

interface NewEmailProps {
  onClose: () => void;
}

const NewEmail: React.FC<NewEmailProps> = ({ onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDarkTheme } = useTheme();
  const { user } = useSession();

  const handleSend = async () => {
    if (!user) return;

    if (!recipient || !subject || !body) {
      showMessage({
        message: "Erro",
        description: "Para enviar um e-mail você precisa preencher todos os campos.",
        type: "danger",
      });

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient, subject, body })
      });

      const data = await response.json();

      if (response.status === 201) {      
        showMessage({
          message: "Sucesso",
          description: `E-mail enviado com sucesso para ${recipient}`,
          type: "success",
        });
      } else {
        showMessage({
          message: "Erro",
          description: data.error || "Falha ao enviar e-mail.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      
      showMessage({
        message: "Erro",
        description: "Erro ao comunicar-se com o servidor.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
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
        placeholder="Para: username"
        placeholderTextColor={isDarkTheme ? '#bbb' : '#666'}
        value={recipient}
        onChangeText={setRecipient}
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
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button title="Enviar" onPress={handleSend} isLoading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  newEmailContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.7,
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
