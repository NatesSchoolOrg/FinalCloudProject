"use client";
import React, { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
  getUsername: () => string | undefined;
  changeUser: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isSecure = process.env.NODE_ENV === "production";

  const login = (username: string) => {
    setIsLoggedIn(true);
    Cookies.set("loggedIn", "true", { expires: 7, secure: isSecure, sameSite: "Lax" });
    Cookies.set("username", username, { expires: 7, secure: isSecure, sameSite: "Lax" });
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove("loggedIn");
  };

  const getUsername = () => {
    return Cookies.get("username");
  };

  const changeUser = (username: string) => {
    Cookies.set("username", username, { expires: 7, secure: isSecure, sameSite: "Lax" });
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getUsername, changeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
