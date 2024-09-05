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
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#FFFFF' }]}>
      <View style={styles.header}>
        <Text style={[styles.sender, { color: isDarkTheme ? '#FFFFF' : '#import React from 'react';
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
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#FFFFF' : '#FFFFF' }]}>
      <View style={styles.header}>
        <Text style={[styles.sender, { color: isDarkTheme ? '#FFFFF' : '#FFFFF' }]}>{sender}</Text>
        <Text style={[styles.date, { color: isDarkTheme ? '#FFFFF' : '#FFFFF' }]}>{date}</Text>
      </View>
      <Text style={[styles.subject, { color: isDarkTheme ? '#FFFFF' : '#FFFFF' }]}>{subject}</Text>
      <Text style={[styles.preview, { color: isDarkTheme ? '#FFFFF' : '#FFFFF' }]}>{preview}</Text>
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
' }]}>{sender}</Text>
        <Text style={[styles.date, { color: isDarkTheme ? '#FFFFF' : '#999' }]}>{date}</Text>
      </View>
      <Text style={[styles.subject, { color: isDarkTheme ? '#FFFFF' : '#555' }]}>{subject}</Text>
      <Text style={[styles.preview, { color: isDarkTheme ? '#FFFFF' : '#555' }]}>{preview}</Text>
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
