import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sender: {
    fontWeight: 'bold',
  },
  subject: {
    marginTop: 5,
    fontSize: 16,
  },
  preview: {
    marginTop: 5,
    color: '#555',
  },
  date: {
    marginTop: 5,
    fontSize: 12,
    color: '#999',
  },
});

export default EmailItem;
