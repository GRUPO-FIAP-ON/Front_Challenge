import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const Header: React.FC<{ onOpenFilterOptions: () => void }> = ({ onOpenFilterOptions }) => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: isDarkTheme ? '#333' : '#f8f8f8' }]}>
      <TouchableOpacity onPress={onOpenFilterOptions}>
        <Ionicons name="filter" size={24} color={isDarkTheme ? '#ddd' : '#333'} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: isDarkTheme ? '#ddd' : '#333' }]}>Aplicativo de Email</Text>
      <View style={styles.iconPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconPlaceholder: {
    width: 24,
  },
});

export default Header;
