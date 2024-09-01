import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Inbox: undefined;
  Calendar: undefined;
};

type FooterNavigationProp = StackNavigationProp<RootStackParamList>;

const Footer: React.FC = () => {
  const navigation = useNavigation<FooterNavigationProp>();
  const [searchVisible, setSearchVisible] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  return (
    <View style={styles.container}>
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
          color={activeIcon === 'mail' ? '#5138EE' : '#777777'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSearchVisible(!searchVisible)}
      >
        <Ionicons
          name="search"
          size={30}
          color={searchVisible ? '#5138EE' : '#777777'}
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
          color={activeIcon === 'calendar' ? '#5138EE' : '#777777'}
        />
      </TouchableOpacity>

      {searchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
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
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    alignItems: 'center',
  },
  searchInput: {
    position: 'absolute',
    bottom: 60,
    left: 10,
    right: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    zIndex: 10,
  },
});

export default Footer;
