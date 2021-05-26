import * as React from "react";
import { User } from "../type";

export type UserContextType = {
  user: User | null;
  removeUser: () => void;
  setUser: (user: User) => void;
};


const userContextDefaultValues: UserContextType = {
  user: null,
  removeUser: () => {},
  setUser: () => {},
};

export const UserContext = React.createContext<UserContextType>(
  userContextDefaultValues
);

export const useUserContext = () => {
  return React.useContext(UserContext);
};

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUserInContext] = React.useState<null | User>(null);
  const removeUser = () => setUserInContext(null);
  const setUser = (user: User) => setUserInContext(user);
  return (
    <UserContext.Provider value={{ user, removeUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
