import * as React from "react";
import { AuthenticatedContextType } from "../type";

const contextDefaultValues: AuthenticatedContextType = {
  loggedIn: false,
  logout: () => {},
  login: () => {},
};

export const AuthenticatedContext = React.createContext<AuthenticatedContextType>(
  contextDefaultValues
);

export const useAuthenticatedContext = () => {
  return React.useContext(AuthenticatedContext);
};

export const AuthenticatedProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const logout = () => setLoggedIn(false);
  const login = () => {
    setLoggedIn(true);
  };
  return (
    <AuthenticatedContext.Provider value={{ loggedIn, logout, login }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};
