import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/EmailItem.styles'; // Importando os estilos

interface EmailItemProps {
  sender: string;
  subject: string;
  preview: string;
  date: string;
}

const EmailItem: React.FC<EmailItemProps> = ({ sender, subject, preview, date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sender}>{sender}</Text>
      <Text style={styles.subject}>{subject}</Text>
      <Text style={styles.preview}>{preview}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default EmailItem;
