import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './app/screen/LoginScreen';
import CadastroScreen from './app/screen/CadastroScreen';
import InboxScreen from './app/screen/InboxScreen';
import CalendarScreen from './app/screen/CalendarScreen';
import EmailSentScreen from './app/screen/EmailSentScreen';
import EmailDeletedScreen from './app/screen/EmailDeletedScreen';
import DraftScreen from './app/screen/DraftScreen';
import ArchiveScreen from './app/screen/ArchiveScreen';
import SpamScreen from './app/screen/SpamScreen';
import Header from './app/components/Header';
import { ThemeProvider, useTheme } from './app/context/ThemeContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC<{ onOpenFilterOptions: () => void }> = ({ onOpenFilterOptions }) => {
  const { isDarkTheme } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Inbox"
      screenOptions={{
        header: () => <Header onOpenDrawer={() => {}} onOpenFilterOptions={onOpenFilterOptions} />,
        drawerStyle: {
          backgroundColor: isDarkTheme ? '#222' : '#fff',
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_700Bold',
          fontSize: 16,
        },
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#ddd',
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
    >
      <Drawer.Screen 
        name="Inbox" 
        component={InboxScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="mail-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Email Sent" 
        component={EmailSentScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="paper-plane-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Email Deleted" 
        component={EmailDeletedScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="trash-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Drafts" 
        component={DraftScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="document-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Archive" 
        component={ArchiveScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="archive-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Spam" 
        component={SpamScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="alert-circle-outline" size={size} color={color} /> }} 
      />
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkTheme } = useTheme();

  const handleOpenFilterOptions = () => {
    setModalVisible(true);
  };

  const handleCloseFilterOptions = () => {
    setModalVisible(false);
  };

  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="Home">
            {() => <DrawerNavigator onOpenFilterOptions={handleOpenFilterOptions} />}
          </Stack.Screen>
        </Stack.Navigator>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseFilterOptions}
        >
          <View style={[styles.modalContainer, { backgroundColor: isDarkTheme ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)' }]}>
            <View style={[styles.modalContent, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
              <Text style={[styles.modalTitle, { color: isDarkTheme ? '#ddd' : '#000' }]}>Filtros</Text>
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="mail-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Inbox</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="paper-plane-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Sent</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="trash-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Deleted</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="document-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Drafts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="archive-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Archive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="alert-circle-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Spam</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCloseFilterOptions}>
                <Text style={[styles.closeButton, { color: isDarkTheme ? '#ddd' : '#000' }]}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    marginBottom: 10,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterText: {
    fontSize: 16,
    fontFamily: 'Ubuntu_400Regular',
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

