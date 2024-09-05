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
import Header from './app/components/Header';
import { ThemeProvider, useTheme } from './app/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC<{ onOpenFilterOptions: () => void }> = ({ onOpenFilterOptions }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Inbox"
      screenOptions={{
        header: () => <Header onOpenFilterOptions={onOpenFilterOptions} />,
        drawerStyle: {
          backgroundColor: '#000000',
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
                  <View style={[styles.modalContentTop, { backgroundColor: isDarkTheme ? '#222' : '#FFFFFF' }]}>
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
                        <Ionicons name={filterOption.icon as any} size={20} color={isDarkTheme ? '#ddd' : '#000'} />
                        <Text style={[styles.optionText, { color: isDarkTheme ? '#ddd' : '#6f6f6f' }]}>
                          {filterOption.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                      style={[styles.filterOption, { backgroundColor: isDarkTheme ? '#333' : '#FFFFFF' }]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={[styles.optionText, { color: isDarkTheme ? '#ddd' : '#6f6f6f' }]}>
                        Fechar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentTop: {
    borderRadius: 8,
    width: '80%',
    padding: 20,
    elevation: 10,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
