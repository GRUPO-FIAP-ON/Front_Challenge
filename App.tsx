import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/src/screen/LoginScreen';
import InboxScreen from './app/src/screen/InboxScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EmailTab: React.FC = () => {
  return <InboxScreen />;
};

const SearchTab: React.FC = () => {
  return <Text>Buscar</Text>;
};

const CalendarTab: React.FC = () => {
  return <Text>Calendário</Text>;
};

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Email" component={EmailTab} />
      <Tab.Screen name="Buscar" component={SearchTab} />
      <Tab.Screen name="Calendário" component={CalendarTab} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Inbox" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
