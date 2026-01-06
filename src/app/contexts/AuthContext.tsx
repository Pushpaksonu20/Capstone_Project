import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'SUPER_ADMIN' | 'BLOOD_BANK_ADMIN' | 'DONOR' | 'HOSPITAL';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  fullName: string;
  email?: string;
  bloodGroup?: string;
  bloodBankId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Mock login - in real app this would call API
    let mockUser: User;

    if (username === 'superadmin' && password === 'admin123') {
      mockUser = {
        id: '1',
        username: 'superadmin',
        role: 'SUPER_ADMIN',
        fullName: 'Super Administrator',
        email: 'super@bloodbank.com'
      };
    } else if (username === 'bankadmin' && password === 'admin123') {
      mockUser = {
        id: '2',
        username: 'bankadmin',
        role: 'BLOOD_BANK_ADMIN',
        fullName: 'Bank Administrator',
        email: 'bank@bloodbank.com',
        bloodBankId: 'bb1'
      };
    } else if (username === 'donor' && password === 'donor123') {
      mockUser = {
        id: '3',
        username: 'donor',
        role: 'DONOR',
        fullName: 'John Donor',
        email: 'donor@example.com',
        bloodGroup: 'A+',
        bloodBankId: 'bb1'
      };
    } else if (username === 'hospital' && password === 'hospital123') {
      mockUser = {
        id: '4',
        username: 'hospital',
        role: 'HOSPITAL',
        fullName: 'City Hospital',
        email: 'hospital@example.com'
      };
    } else {
      throw new Error('Invalid credentials');
    }

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-jwt-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = async (data: any) => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      username: data.email || data.contactNumber,
      role: data.role,
      fullName: data.fullName || data.hospitalName,
      email: data.email,
      bloodGroup: data.bloodGroup,
      bloodBankId: data.bloodBankId
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', 'mock-jwt-token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
