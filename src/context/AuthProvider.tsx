import { createContext, useState, ReactNode, useContext } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
}

interface AuthContextProps {
  token: string;
  user: User | null;
  loginAction: (data: LoginData) => Promise<void>;
  logOut: () => void;
}

interface LoginData {
  username: string;
  password: string;
  role: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem('id') || '');

  const loginAction = async (data: LoginData) => {
    try {
      const response = await fetch('http://localhost:8000/user');
      const users = await response.json();

      const foundUser = users.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    }
  };

  const logOut = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('id');
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
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
