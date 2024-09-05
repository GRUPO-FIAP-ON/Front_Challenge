import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenFilterOptions: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenDrawer, onOpenFilterOptions }) => {
  const { toggleTheme, isDarkTheme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: isDarkTheme ? '#222' : '#fff' }]}>
      <TouchableOpacity onPress={onOpenDrawer} style={styles.iconButton}>
        <Ionicons name="menu-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: isDarkTheme ? '#ddd' : '#000' }]}>Locamail</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onOpenFilterOptions} style={styles.iconButton}>
          <Ionicons name="funnel-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          <Ionicons name={isDarkTheme ? 'sunny-outline' : 'moon-outline'} size={24} color={isDarkTheme ? '#ddd' : '#000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default Header;