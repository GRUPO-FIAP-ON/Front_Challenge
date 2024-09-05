import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import LoginScreen from './app/screen/LoginScreen';
import CadastroScreen from './app/screen/CadastroScreen';
import InboxScreen from './app/screen/InboxScreen';
import CalendarScreen from './app/screen/CalendarScreen';
import EmailSentScreen from './app/screen/EmailSentScreen';
import EmailDeletedScreen from './app/screen/EmailDeletedScreen';
import DraftScreen from './app/screen/DraftScreen';
import ArchiveScreen from './app/screen/ArchiveScreen';
import SpamScreen from './app/screen/SpamScreen';
import Header from './app/components/Header'; // Importando o Header
import { ThemeProvider, useTheme } from './app/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

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
        name="Caixa de entrada" 
        component={InboxScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="mail-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Enviados" 
        component={EmailSentScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="paper-plane-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Excluídos" 
        component={EmailDeletedScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="trash-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Rascunhos" 
        component={DraftScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="document-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Arquivo Morto" 
        component={ArchiveScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="archive-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Lixo eletrônico" 
        component={SpamScreen} 
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="alert-circle-outline" size={size} color={color} /> }} 
      />
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenFilterOptions = () => {
    setModalVisible(true);
  };

  const handleCloseFilterOptions = () => {
    setModalVisible(false);
  };

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
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Filtros</Text>
              <TouchableOpacity onPress={handleCloseFilterOptions}>
                <Text style={styles.closeButton}>Fechar</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default App;
