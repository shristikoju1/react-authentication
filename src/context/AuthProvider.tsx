import { createContext, useState, ReactNode, useContext, useMemo, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
}

interface AuthContextProps {
  token: string;
  user: User | null;
  loginAction: (data: LoginData) => Promise<void>;
  handleLogout: () => void;
}

interface LoginData {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem('id') || '');

  const loginAction = useCallback(  async (data: LoginData) => {
    try {
      const response = await fetch('http://localhost:8000/user');
      const users = await response.json();

      const foundUser = users.find(
        (user: any) => user.username === data.username && user.password === data.password
      );

      if (foundUser) {
        setUser(foundUser);
        setToken(foundUser.id); 
        localStorage.setItem('id', foundUser.id); 
        localStorage.setItem('user', foundUser.username); 
        localStorage.setItem('role', foundUser.role); 
        return;
      }

      throw new Error('Invalid username or password');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },[]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setToken('');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  },[]);

  // Memoize the context value using useMemo
  const contextValue = useMemo(() => ({
    token,
    user,
    loginAction,
    handleLogout
  }), [token, user, loginAction, handleLogout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
