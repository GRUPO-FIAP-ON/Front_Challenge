// ./app/app.tsx
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
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeProvider, useTheme } from './app/context/ThemeContext';
import Header from './app/components/Header';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC<{ onOpenFilterOptions: () => void }> = ({ onOpenFilterOptions }) => {
  const { isDarkTheme } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Inbox"
      screenOptions={({ navigation }) => ({
        header: () => <Header navigation={navigation} />, // Usa o Header
        drawerStyle: {
          backgroundColor: isDarkTheme ? '#000000' : '#FFFFFF',
        },
        drawerLabelStyle: {
          fontFamily: 'Ubuntu_700Bold',
          fontSize: 16,
          color: isDarkTheme ? '#FFFFFF' : '#000000',
        },
        drawerActiveTintColor: isDarkTheme ? '#FFFFFF' : '#000000',
        drawerInactiveTintColor: isDarkTheme ? '#ddd' : '#383838',
        drawerItemStyle: {
          marginVertical: 5,
        },
      })}
    >
      <Drawer.Screen 
        name="Caixa de entrada" 
        component={InboxScreen} 
        options={{ drawerIcon: ({ color, size }) => <Icon name="mail-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Enviados" 
        component={EmailSentScreen} 
        options={{ drawerIcon: ({ color, size }) => <Icon name="paper-plane-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Excluídos" 
        component={EmailDeletedScreen} 
        options={{ drawerIcon: ({ color, size }) => <Icon name="trash-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Rascunhos" 
        component={DraftScreen} 
        options={{ drawerIcon: ({ color, size }) => <Icon name="document-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Arquivo Morto" 
        component={ArchiveScreen} 
        options={{ drawerIcon: ({ color, size }) => <Icon name="archive-outline" size={size} color={color} /> }} 
      />
      <Drawer.Screen 
        name="Lixo eletrônico" 
        component={SpamScreen} 
        options={{ drawerIcon: ({ color, size }) => <Icon name="alert-circle-outline" size={size} color={color} /> }} 
      />
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'flagged' | 'pinned' | 'attachments'>('all');

  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Ou um spinner de carregamento
  }

  const handleFilterChange = (newFilter: 'all' | 'unread' | 'flagged' | 'pinned' | 'attachments') => {
    setFilter(newFilter);
    setModalVisible(false);
  };

  const { toggleTheme, isDarkTheme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inbox"
          options={{ headerShown: false }}
        >
          {props => (
            <>
              <DrawerNavigator onOpenFilterOptions={() => setModalVisible(true)} {...props} />
              <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableOpacity
                  style={[styles.modalBackdrop, { backgroundColor: isDarkTheme ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)' }]}
                  activeOpacity={1}
                  onPressOut={() => setModalVisible(false)}
                >
                  <View style={[styles.modalContent, { backgroundColor: isDarkTheme ? '#222' : '#FFFFFF' }]}>
                    {[
                      { type: 'all', label: 'Todas', icon: 'mail-outline' },
                      { type: 'unread', label: 'Não Lidas', icon: 'mail-unread-outline' },
                      { type: 'flagged', label: 'Sinalizados', icon: 'flag-outline' },
                      { type: 'pinned', label: 'Fixos', icon: 'pin-outline' },
                      { type: 'attachments', label: 'Com Anexos', icon: 'attach-outline' },
                    ].map((filterOption) => (
                      <TouchableOpacity
                        key={filterOption.type}
                        style={[styles.filterOption, { backgroundColor: isDarkTheme ? '#333' : '#FFFFFF' }]}
                        onPress={() => handleFilterChange(filterOption.type as typeof filter)}
                      >
                        <Icon name={filterOption.icon} size={20} color={isDarkTheme ? '#ddd' : '#000'} />
                        <Text style={[styles.optionText, { color: isDarkTheme ? '#ddd' : '#6f6f6f' }]}>
                          {filterOption.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Ubuntu_400Regular',
  },
});

export default App;