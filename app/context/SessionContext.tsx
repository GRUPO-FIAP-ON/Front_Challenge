import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getSessionData } from '../services/sessionStorage';
import { ActivityIndicator } from 'react-native';

type UserProps = { 
    id: string;
    username: string;
    fullName: string;
    email: string;
    createdAt: Date;
}

interface SessionContextProps {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const authData = await getSessionData('authData');
                if (authData) {
                    setUser(JSON.parse(authData));
                }
            } catch (e) {
                setError('Failed to load user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#5138EE" />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <SessionContext.Provider value={{ user, setUser }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
};
