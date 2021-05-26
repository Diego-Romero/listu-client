import * as React from "react";

export type UiContextType = {
  loading: boolean;
  navBarOpen: boolean;
  setLoading: (loading: boolean) => void;
  setNavBarOpen: (open: boolean) => void;
};

const contextDefaultValues: UiContextType = {
  loading: false,
  setLoading: () => {},
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
  const [loading, setLoadingState] = React.useState<boolean>(false);
  const [navBarOpen, setNavBarOpenState] = React.useState<boolean>(true);
  const setLoading = (loadingState: boolean) => setLoadingState(loadingState);
  const setNavBarOpen = (open: boolean) => setNavBarOpenState(open);
  return (
    <UiContext.Provider
      value={{ loading, setLoading, navBarOpen, setNavBarOpen }}
    >
      {children}
    </UiContext.Provider>
  );
};
