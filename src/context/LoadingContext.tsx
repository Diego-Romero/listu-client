import * as React from "react";
import { LoadingContextType } from "../type";

const contextDefaultValues: LoadingContextType = {
  loading: true,
  setLoading: () => {},
};

export const LoadingContext = React.createContext<LoadingContextType>(
  contextDefaultValues
);

export const useLoadingContext = () => {
  return React.useContext(LoadingContext);
};

export const LoadingContextProvider: React.FC = ({ children }) => {
  const [loading, setLoadingState] = React.useState<boolean>(true);
  const setLoading = (loadingState: boolean) => setLoadingState(loadingState);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
