import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext'; // Assumindo que você está usando um ThemeContext

interface EmailItemProps {
  date: string;
  sender: string;
  subject: string;
  preview: string;
  flagged: boolean;
}

const EmailItem: React.FC<EmailItemProps> = ({ sender, subject, preview, date, flagged }) => {
  const { isDarkTheme } = useTheme(); // Pega o estado do tema

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#FFFFFF' }]}>
      <View style={styles.header}>
        <Text style={[styles.sender, { color: isDarkTheme ? '#FFFFFF' : '#000000' }]}>{sender}</Text>
        <Text style={[styles.date, { color: isDarkTheme ? '#FFFFFF' : '#999999' }]}>{date}</Text>
      </View>
      <Text style={[styles.subject, { color: isDarkTheme ? '#FFFFFF' : '#555555' }]}>{subject}</Text>
      <Text style={[styles.preview, { color: isDarkTheme ? '#FFFFFF' : '#555555' }]}>{preview}</Text>
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
  },
  preview: {
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  flagIcon: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default EmailItem;
