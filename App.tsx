import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './app/screen/LoginScreen';
import CadastroScreen from './app/screen/CadastroScreen';
import InboxScreen from './app/screen/InboxScreen';
import EmailSentScreen from './app/screen/EmailSentScreen';
import EmailDeletedScreen from './app/screen/EmailDeletedScreen';
import DraftScreen from './app/screen/DraftScreen';
import ArchiveScreen from './app/screen/ArchiveScreen';
import SpamScreen from './app/screen/SpamScreen';
import CalendarScreen from './app/screen/CalendarScreen';
import { ThemeProvider, useTheme } from './app/context/ThemeContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Header: React.FC<{ onOpenDrawer: () => void; onOpenFilterOptions: () => void; title: string }> = ({ onOpenDrawer, onOpenFilterOptions, title }) => {
  const { toggleTheme, isDarkTheme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: isDarkTheme ? '#222' : '#fff' }]}>
      <TouchableOpacity onPress={onOpenDrawer} style={styles.iconButton}>
        <Ionicons name="menu-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: isDarkTheme ? '#ddd' : '#000' }]}>{title}</Text>
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

const DrawerNavigator: React.FC<{ onOpenFilterOptions: () => void }> = ({ onOpenFilterOptions }) => {
  const { isDarkTheme } = useTheme();
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName="Caixa de Entrada"
      screenOptions={({ route }) => ({
        header: () => (
          <Header
            onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
            onOpenFilterOptions={onOpenFilterOptions}
            title={route.name}
          />
        ),
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
      })}
    >
      <Drawer.Screen
        name="Caixa de Entrada"
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
        name="Lixo Eletrônico"
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
          <Stack.Screen name="Calendar" component={CalendarScreen} />
        </Stack.Navigator>

        {/* Modal para exibir os filtros */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseFilterOptions}
        >
          <View style={[styles.modalContainer, { backgroundColor: isDarkTheme ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)' }]}>
            <View style={[styles.modalContent, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
              <Text style={[styles.modalTitle, { color: isDarkTheme ? '#ddd' : '#000' }]}>Filtros</Text>

              {/* Filtro: Todas */}
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="mail-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Todas</Text>
              </TouchableOpacity>

              {/* Filtro: Não lidas */}
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="eye-off-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Não lidas</Text>
              </TouchableOpacity>

              {/* Filtro: Sinalizados */}
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="flag-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Sinalizados</Text>
              </TouchableOpacity>

              {/* Filtro: Fixos */}
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="bookmark-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Fixos</Text>
              </TouchableOpacity>

              {/* Filtro: Com Anexos */}
              <TouchableOpacity style={styles.filterOption}>
                <Ionicons name="attach-outline" size={24} color={isDarkTheme ? '#ddd' : '#000'} />
                <Text style={[styles.filterText, { color: isDarkTheme ? '#ddd' : '#000' }]}>Com Anexos</Text>
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
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
