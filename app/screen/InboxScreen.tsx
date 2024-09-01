import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EmailItem from '../components/EmailItem';
import Footer from '../components/Footer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import NewEmail from './NewEmail';

type RootStackParamList = {
  Inbox: undefined;
  NovoEmail: undefined;
};

type InboxScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inbox'>;


const emailsEstaSemana = [
  { id: '1', sender: 'Thábata Orbeteli', subject: 'Assunto', preview: 'Lorem ipsum dolor...', date: '08/07/2024', flagged: false },
  { id: '2', sender: 'Yago Taguchi', subject: 'Assunto', preview: 'Lorem ipsum dolor...', date: '09/07/2024', flagged: true },
];

const emailsSemanaPassada = [
  { id: '3', sender: 'Eduardo Shoiti', subject: 'Assunto', preview: 'Lorem ipsum dolor...', date: '01/07/2024', flagged: false },
];

const emailsEsteMes = [
  { id: '3', sender: ' Guilherme Avelino', subject: 'Assunto', preview: 'Lorem ipsum dolor...', date: '01/07/2024', flagged: false },
];

const InboxScreen: React.FC = () => {
  const navigation = useNavigation<InboxScreenNavigationProp>();
  const [newEmailVisible, setNewEmailVisible] = useState(false);

  const renderEmailItem = ({ item }: any) => (
    <EmailItem
      sender={item.sender}
      subject={item.subject}
      preview={item.preview}
      date={item.date}
      flagged={item.flagged} 
    />
  );

  return (
    <View style={styles.container}>
    <FlatList
      data={emailsEstaSemana}
      renderItem={renderEmailItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <Text style={styles.sectionHeader}>Esta Semana</Text>
        </>
      }
    />
    <FlatList
      data={emailsSemanaPassada}
      renderItem={renderEmailItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <Text style={styles.sectionHeader}>Semana Passada</Text>
        </>
      }
    />
    <FlatList
      data={emailsEsteMes}
      renderItem={renderEmailItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <Text style={styles.sectionHeader}>Este Mês</Text>
        </>
      }
    />
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => setNewEmailVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {newEmailVisible && (
        <NewEmail onClose={() => setNewEmailVisible(false)} />
      )}

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 80, 
    backgroundColor: '#5138EE',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
});

export default InboxScreen;
