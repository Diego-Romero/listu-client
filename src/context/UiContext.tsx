import * as React from "react";

export type UiContextType = {
  navBarOpen: boolean;
  setNavBarOpen: (open: boolean) => void;
};

const contextDefaultValues: UiContextType = {
  navBarOpen: true,
  setNavBarOpen: () => {},
};

export const UiContext = React.createContext<UiContextType>(
  contextDefaultValues
);

export const useUiContext = () => {
  return React.useContext(UiContext);
};

export const UiContextProvider: React.FC = ({ children }) => {
  const [navBarOpen, setNavBarOpenState] = React.useState<boolean>(true);
  const setNavBarOpen = (open: boolean) => setNavBarOpenState(open);
  return (
    <UiContext.Provider
      value={{ navBarOpen, setNavBarOpen }}
    >
      {children}
    </UiContext.Provider>
  );
};
