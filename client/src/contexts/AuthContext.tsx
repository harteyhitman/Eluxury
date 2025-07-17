// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import api from '@/libs/api';
// import { useRouter } from 'next/router';

// interface User {
//   id: number;
//   email: string;
//   username: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (username: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const { data } = await api.get('/auth/profile');
//           setUser(data);
//         }
//       } catch (err) {
//         localStorage.removeItem('token');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   const login = async (email: string, password: string) => {
//     const { data } = await api.post('/auth/login', { email, password });
//     localStorage.setItem('token', data.access_token);
//     setUser(data.user);
//     router.push('/dashboard');
//   };

//   const register = async (username: string, email: string, password: string) => {
//     await api.post('/auth/signup', { username, email, password });
//     router.push('/login');
//   };

//   const logout = async () => {
//     await api.post('/auth/logout');
//     localStorage.removeItem('token');
//     setUser(null);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);