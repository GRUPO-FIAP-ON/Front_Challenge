import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './app/screen/LoginScreen';
import CadastroScreen from './app/screen/CadastroScreen';
import InboxScreen from './app/screen/InboxScreen';
import CalendarScreen from './app/screen/CalendarScreen';
import EmailSentScreen from './app/screen/EmailSentScreen';
import EmailDeletedScreen from './app/screen/EmailDeletedScreen';
import DraftScreen from './app/screen/DraftScreen';
import ArchiveScreen from './app/screen/ArchiveScreen';
import SpamScreen from './app/screen/SpamScreen';
import { Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { useFonts } from 'expo-font';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { ThemeProvider, useTheme } from './app/context/ThemeContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC<{ onOpenFilterOptions: () => void }> = ({ onOpenFilterOptions }) => {
  const { isDarkTheme } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Inbox"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Icon
            name="menu"
            size={25}
            color={isDarkTheme ? '#fff' : '#000'}
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        headerRight: () => (
          <Icon
            name="funnel-outline"
            size={25}
            color={isDarkTheme ? '#fff' : '#383838'}
            style={{ marginRight: 15 }}
            onPress={onOpenFilterOptions}
          />
        ),
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Ubuntu_700Bold',
          fontSize: 18,
          color: isDarkTheme ? '#fff' : '#000',
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_700Bold',
          fontSize: 16,
        },
        drawerActiveTintColor: isDarkTheme ? '#fff' : '#000',
        drawerInactiveTintColor: isDarkTheme ? '#ddd' : '#383838',
      })}
    >
      {/* Drawer screens */}
      <Drawer.Screen name="Caixa de entrada" component={InboxScreen} />
      <Drawer.Screen name="Enviados" component={EmailSentScreen} />
      <Drawer.Screen name="Excluídos" component={EmailDeletedScreen} />
      <Drawer.Screen name="Rascunhos" component={DraftScreen} />
      <Drawer.Screen name="Arquivo Morto" component={ArchiveScreen} />
      <Drawer.Screen name="Lixo eletrônico" component={SpamScreen} />
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });

  const { isDarkTheme, toggleTheme } = useTheme();

  if (!fontsLoaded) {
    return null; // Carregando as fontes
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      <Button title={isDarkTheme ? "Tema Claro" : "Tema Escuro"} onPress={toggleTheme} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Inbox" options={{ headerShown: false }}>
            {props => (
              <>
                <DrawerNavigator onOpenFilterOptions={() => setModalVisible(true)} {...props} />
                {/* Modal para filtro */}
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <TouchableOpacity
                    style={styles.modalBackdrop}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                  >
                    <View style={styles.modalContentTop}>
                      {/* Modal options */}
                      <Text style={[styles.optionText, { color: isDarkTheme ? '#fff' : '#000' }]}>
                        Filtrar Opções
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Modal>
              </>
            )}
          </Stack.Screen>
          <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentTop: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 60,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 20,
    marginLeft: 10,
    color: '#6f6f6f',
    fontFamily: 'Ubuntu_700Bold',
  },
});

export default function Main() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
