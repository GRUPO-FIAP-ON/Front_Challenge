import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmailItemProps {
  date: string;
  sender: string;
  subject: string;
  preview: string;
  flagged: boolean; 
}

const EmailItem: React.FC<EmailItemProps> = ({ sender, subject, preview, date, flagged }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sender}>{sender}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.subject}>{subject}</Text>
      <Text style={styles.preview}>{preview}</Text>
      {flagged && <Ionicons name="flag" size={20} color="red" style={styles.flagIcon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  sender: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 14,
  },
  subject: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#555',
  },
  preview: {
    marginTop: 5,
    color: '#555',
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  flagIcon: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default EmailItem;
