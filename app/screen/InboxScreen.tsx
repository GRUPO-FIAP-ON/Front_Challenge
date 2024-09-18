import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import EmailItem from '../components/EmailItem';
import Footer from '../components/Footer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import NewEmail from './NewEmail';
import { useTheme } from '../context/ThemeContext'; 
import { useSession } from '../context/SessionContext';

type RootStackParamList = {
  Inbox: undefined;
  NovoEmail: undefined;
};

type InboxScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inbox'>;

const InboxScreen: React.FC = () => {
  const navigation = useNavigation<InboxScreenNavigationProp>();
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmailVisible, setNewEmailVisible] = useState(false);
  const { isDarkTheme } = useTheme(); 
  const { user, loading: userLoading } = useSession();

  useEffect(() => {
    const fetchEmails = async () => {
      if (!user || userLoading) return;

      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}/emails`);
        
        if (!response.ok) {
          throw new Error('Erro ao buscar e-mails');
        }
        const data = await response.json();
        setEmails(data?.receivedEmails);
      } catch (error) {
        console.error("Erro ao buscar e-mails: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [user, userLoading]);

  const renderEmailItem = ({ item }: any) => (
    <EmailItem
      sender={item.sender.fullName}
      subject={item.subject}
      preview={item.body}
      date={item.date}
      flagged={item.flagged} 
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#f8f8f8' }]}>
      {
        loading || userLoading ? (
          <View style={[{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }]}>
            <ActivityIndicator size="large" color="#5138EE" />
          </View>
        ) : (
          <>
            <FlatList
              data={emails}
              renderItem={renderEmailItem}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={
                <Text style={[styles.sectionHeader, { color: isDarkTheme ? '#FFFFFF' : '#000', backgroundColor: isDarkTheme ? '#444' : '#f0f0f0' }]}>
                  E-mails
                </Text>
              }
            />
            <TouchableOpacity 
              style={[styles.floatingButton, { backgroundColor: isDarkTheme ? '#5138EE' : '#5138EE' }]}
              onPress={() => setNewEmailVisible(true)}
            >
              <Ionicons name="add" size={30} color="#FFFFFF" />
            </TouchableOpacity>

            {newEmailVisible && (
              <NewEmail onClose={() => setNewEmailVisible(false)} />
            )}

            <Footer />
          </>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Ubuntu_700Bold',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 80, 
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
});

export default InboxScreen;
