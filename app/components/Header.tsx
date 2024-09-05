import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

interface HeaderProps {
  navigation: any; // Tipo de navegação
}

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const { isDarkTheme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: isDarkTheme ? '#222' : '#fff' }]}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" size={30} color={isDarkTheme ? '#fff' : '#000'} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>Caixa de Entrada</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Spam')}>
        <Icon name="alert-circle-outline" size={30} color={isDarkTheme ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
  },
});

export default Header;


