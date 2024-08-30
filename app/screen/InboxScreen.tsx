import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import EmailItem from '../components/EmailItem';
import BottomNavigation from '../components/BottomNavigation';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
}

type RootStackParamList = {
  Inbox: undefined;
  NovoEmail: undefined;
};

type InboxScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inbox'>;

const emails: Email[] = [
  { id: '1', sender: 'Thábata Orbeteli', subject: 'Assunto', preview: 'Lorem ipsum dolor...', date: 'terça-feira' },
  { id: '2', sender: 'Yago Taguchi', subject: 'Assunto', preview: 'Lorem ipsum dolor...', date: 'segunda-feira' },
  // Adicione mais itens...
];

const { height } = Dimensions.get('window');

const InboxScreen: React.FC = () => {
  const navigation = useNavigation<InboxScreenNavigationProp>();
  const [newMessageVisible, setNewMessageVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Barra de Busca */}
      {searchVisible && (
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar..."
          />
          <TouchableOpacity onPress={() => setSearchVisible(false)}>
            <Ionicons name="close" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      )}
      
      {/* Lista de Emails */}
      <FlatList
        data={emails}
        renderItem={({ item }) => (
          <EmailItem
            sender={item.sender}
            subject={item.subject}
            preview={item.preview}
            date={item.date}
          />
        )}
        keyExtractor={item => item.id}
      />

      {/* Botão Flutuante para Novo Email */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => setNewMessageVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Componente de Nova Mensagem */}
      {newMessageVisible && (
        <View style={styles.newMessageContainer}>
          <Text style={styles.newMessageTitle}>Nova Mensagem</Text>
          <TextInput
            style={styles.input}
            placeholder="Para"
          />
          <TextInput
            style={styles.input}
            placeholder="Assunto"
          />
          <TextInput
            style={styles.messageInput}
            placeholder="Mensagem"
            multiline
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setNewMessageVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}

      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ea',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  newMessageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.7, // 70% da altura da tela
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10, // Adiciona uma sombra para destacar o popup
  },
  newMessageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
    height: 200,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default InboxScreen;
