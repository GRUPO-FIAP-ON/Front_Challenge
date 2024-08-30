import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './app/screen/LoginScreen';
import InboxScreen from './app/screen/InboxScreen';
import EmailSentScreen from './app/screen/EmailSentScreen';
import EmailDeletedScreen from './app/screen/EmailDeletedScreen';
import DraftScreen from './app/screen/DraftScreen';
import ArchiveScreen from './app/screen/ArchiveScreen';
import SpamScreen from './app/screen/SpamScreen';
import NewMessageScreen from './app/screen/NewMessageScreen';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';

const { height } = Dimensions.get('window');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC<{ onOpenFilterOptions: () => void, onOpenSearch: () => void }> = ({ onOpenFilterOptions, onOpenSearch }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Caixa de entrada"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Icon
            name="menu"
            size={25}
            color="#000"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name="funnel-outline"
              size={25}
              color="#000"
              style={{ marginRight: 15 }}
              onPress={onOpenFilterOptions}
            />
            <Icon
              name="search-outline"
              size={25}
              color="#000"
              style={{ marginRight: 15 }}
              onPress={onOpenSearch}
            />
          </View>
        ),
      })}
    >
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
  const [searchVisible, setSearchVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'flagged' | 'pinned' | 'attachments'>('all');

  const handleFilterChange = (newFilter: 'all' | 'unread' | 'flagged' | 'pinned' | 'attachments') => {
    setFilter(newFilter);
    setModalVisible(false);
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
          name="Inbox"
          options={{ headerShown: false }}
        >
          {props => (
            <>
              <DrawerNavigator 
                onOpenFilterOptions={() => setModalVisible(true)} 
                onOpenSearch={() => setSearchVisible(true)}
                {...props} 
              />

              {/* Barra de Busca */}
              {searchVisible && (
                <View style={styles.searchBar}>
                  <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    autoFocus
                    onSubmitEditing={() => setSearchVisible(false)}
                  />
                  <TouchableOpacity 
                    style={styles.searchCloseButton} 
                    onPress={() => setSearchVisible(false)}
                  >
                    <Text style={styles.searchCloseButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => handleFilterChange('all')}>
                      <Text style={styles.optionText}>Todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterChange('unread')}>
                      <Text style={styles.optionText}>Não Lidos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterChange('flagged')}>
                      <Text style={styles.optionText}>Sinalizados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterChange('pinned')}>
                      <Text style={styles.optionText}>Fixos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFilterChange('attachments')}>
                      <Text style={styles.optionText}>Com Anexos</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <Modal
                transparent={true}
                animationType="slide"
                visible={false} // A visibilidade do modal de nova mensagem é controlada na tela InboxScreen
                onRequestClose={() => {}}
              >
                <View style={styles.newMessageContainer}>
                  <NewMessageScreen />
                  <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={() => {}}
                  >
                    <Text style={styles.closeButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="NovoEmail"
          component={NewMessageScreen}
          options={{ title: 'Nova Mensagem' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    marginVertical: 10,
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000, // Para garantir que a barra de busca fique acima dos outros componentes
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchCloseButton: {
    padding: 10,
    marginLeft: 10,
  },
  searchCloseButtonText: {
    fontSize: 16,
    color: '#6200ea',
  },
  newMessageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.7, // 70% da altura da tela
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10, // Adiciona uma sombra para destacar o popup
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;

