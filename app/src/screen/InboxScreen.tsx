import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import EmailItem from '../components/EmailItem';
import ActionButton from '../components/ActionButton';
import BottomNavigation from '../components/BottomNavigation';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
}

const emails: Email[] = [
  { id: '1', sender: 'Thábata Orbeteli', subject: 'Assunto', preview: 'Lorem ipsum dolor...', date: 'terça-feira' },
  { id: '2', sender: 'Yago Taguchi', subject: 'Assunto', preview: 'Lorem ipsum dolor...', date: 'segunda-feira' },
  // Adicione mais itens...
];

const InboxScreen: React.FC = () => {
  return (
    <View style={styles.container}>
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
      <ActionButton />
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default InboxScreen;

