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
import { ThemeProvider, useTheme } from './app/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  const { isDarkTheme } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Inbox"
      screenOptions={{
        drawerStyle: {
          backgroundColor: isDarkTheme ? '#333' : '#fff',
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
        options={{ 
          drawerIcon: ({ color, size }) => <Ionicons name="mail-outline" size={size} color={color} />,
          title: 'Caixa de entrada',
        }} 
      />
      <Drawer.Screen 
        name="Sent" 
        component={EmailSentScreen} 
        options={{ 
          drawerIcon: ({ color, size }) => <Ionicons name="paper-plane-outline" size={size} color={color} />,
          title: 'Enviados',
        }} 
      />
      <Drawer.Screen 
        name="Deleted" 
        component={EmailDeletedScreen} 
        options={{ 
          drawerIcon: ({ color, size }) => <Ionicons name="trash-outline" size={size} color={color} />,
          title: 'Excluídos',
        }} 
      />
      <Drawer.Screen 
        name="Drafts" 
        component={DraftScreen} 
        options={{ 
          drawerIcon: ({ color, size }) => <Ionicons name="document-outline" size={size} color={color} />,
          title: 'Rascunhos',
        }} 
      />
      <Drawer.Screen 
        name="Archive" 
        component={ArchiveScreen} 
        options={{ 
          drawerIcon: ({ color, size }) => <Ionicons name="archive-outline" size={size} color={color} />,
          title: 'Arquivo Morto',
        }} 
      />
      <Drawer.Screen 
        name="Spam" 
        component={SpamScreen} 
        options={{ 
          drawerIcon: ({ color, size }) => <Ionicons name="alert-circle-outline" size={size} color={color} />,
          title: 'Lixo eletrônico',
        }} 
      />
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'flagged' | 'pinned' | 'attachments'>('all');
  const { toggleTheme, isDarkTheme } = useTheme();

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

  const HeaderTitle = ({ title }: { title: string }) => {
    return (
      <Text style={[styles.headerTitle, { color: isDarkTheme ? '#ddd' : '#000' }]}>
        {title}
      </Text>
    );
  };

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
          name="Home"
          component={DrawerNavigator}
          options={({ route }) => ({
            headerTitle: () => <HeaderTitle title={route.name} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name="filter-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

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
          </View>
        </TouchableOpacity>
      </Modal>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  modalContentTop: {
    borderRadius: 10,
    padding: 20,
    marginTop: 60,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  optionText: {
    marginLeft: 10,
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 16,
  },
  headerTitle: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
  },
});

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
