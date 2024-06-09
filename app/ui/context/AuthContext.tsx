"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';




interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const login = async (email: string, password: string) => {
        const response = await fetch('https://api-priv.onrender.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });       
        if (response.ok) {
            const data = await response.json();
            console.log("logrado"+data.message);
            setUser(data.user);
            
        } else {
            const resp = await response.json();
            throw new Error(resp.error);          
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('https://api-priv.onrender.com/users/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                setUser(null);
                console.log('Logout successful');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('https://api-priv.onrender.com/users/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
            } finally {
                setLoading(false);
            }
        };
        checkAuthStatus();
    }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}