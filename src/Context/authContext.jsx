import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { createContext, useContext, useEffect, useState } from "react";
  import { auth } from "../firebase";
  
  const AuthContext = createContext();
  export const useAuth = () => useContext(AuthContext);
  
  export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser || null);
        setLoading(false); 
      });
      return () => unsubscribe();
    }, []);
  
    const signUp = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const login = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logout = () => {
      return signOut(auth);
    };
  
    return (
      <AuthContext.Provider value={{ signUp, login, logout, user, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  