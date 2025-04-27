
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";

// Define the user type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// Create the auth provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          role: 'admin'
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back, Admin!",
        });
      } else if (email === 'user@example.com' && password === 'password') {
        const user: User = {
          id: '2',
          name: 'Regular User',
          email: 'user@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
          role: 'user'
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // Mock Google login function
  const googleLogin = async () => {
    try {
      setLoading(true);
      // Simulating Google login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: '2',
        name: 'Google User',
        email: 'google@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
        role: 'user'
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast({
        title: "Google login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logout successful",
      description: "You have been logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        googleLogin,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create the auth hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
