import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';

type RootStackParamList = {
  Inbox: undefined;
  Calendar: undefined;
};

type FooterNavigationProp = StackNavigationProp<RootStackParamList>;

const Footer: React.FC = () => {
  const navigation = useNavigation<FooterNavigationProp>();
  const [searchVisible, setSearchVisible] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const { isDarkTheme } = useTheme();

  const handleSearchToggle = () => {
    setSearchVisible(prev => !prev);
    setActiveIcon(searchVisible ? null : 'search');
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: isDarkTheme ? '#000' : '#f8f8f8',
        borderTopColor: isDarkTheme ? '#333' : '#ccc',
      }
    ]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setActiveIcon('mail');
          navigation.navigate('Inbox');
        }}
      >
        <Ionicons
          name="mail"
          size={30}
          color={activeIcon === 'mail' ? '#5138EE' : isDarkTheme ? '#ddd' : '#777777'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSearchToggle}
      >
        <Ionicons
          name="search"
          size={30}
          color={activeIcon === 'search' ? '#5138EE' : isDarkTheme ? '#ddd' : '#777777'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setActiveIcon('calendar');
          navigation.navigate('Calendar');
        }}
      >
        <Ionicons
          name="calendar"
          size={30}
          color={activeIcon === 'calendar' ? '#5138EE' : isDarkTheme ? '#ddd' : '#777777'}
        />
      </TouchableOpacity>

      {searchVisible && (
        <TextInput
          style={[
            styles.searchInput, 
            { 
              backgroundColor: isDarkTheme ? '#333' : '#fff',
              color: isDarkTheme ? '#fff' : '#000',
              borderColor: isDarkTheme ? '#555' : '#ccc',
            }
          ]}
          placeholder="Buscar..."
          placeholderTextColor={isDarkTheme ? '#aaa' : '#888'}
          autoFocus={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
  },
  button: {
    alignItems: 'center',
  },
  searchInput: {
    position: 'absolute',
    bottom: 60,
    left: 10,
    right: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 10,
  },
});

export default Footer;