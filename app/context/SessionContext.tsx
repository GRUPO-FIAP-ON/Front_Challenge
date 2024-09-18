import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getSessionData } from '../services/sessionStorage';

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
  loading: boolean;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const authData = await getSessionData('authData');
                if (authData) {
                    setUser(JSON.parse(authData));
                } else {
                    setUser(null);
                }
            } catch (e) {
                console.error('Failed to load user data:', e);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <SessionContext.Provider value={{ user, setUser, loading }}>
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
