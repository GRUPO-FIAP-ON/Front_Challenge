import React from 'react';
import { FlatList, View, Text } from 'react-native';
import EmailItem from '../components/EmailItem';
import ActionButton from '../components/ActionButton';
import BottomNavigation from '../components/BottomNavigation';
import { styles } from '../styles/InboxScreen.styles'; // Importando os estilos

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
  // Adicione mais emails...
];

const InboxScreen: React.FC = () => {
  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

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
        ListHeaderComponent={() => (
          <>
            {renderSectionHeader('Esta Semana')}
          </>
        )}
      />
      <ActionButton />
      <BottomNavigation />
    </View>
  );
};

export default InboxScreen;
