import * as React from "react";
import { UserResponse } from "../api/requests";
import { AuthenticatedContextType } from "../type";

const contextDefaultValues: AuthenticatedContextType = {
  user: null,
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
  const [user, setUser] = React.useState<null | UserResponse>(null);
  const logout = () => setUser(null);
  const login = (user: UserResponse) => setUser(user);
  return (
    <AuthenticatedContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};
