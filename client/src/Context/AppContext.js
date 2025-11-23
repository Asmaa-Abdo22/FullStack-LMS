import { createContext } from "react";

export const AppContextt = createContext();
export const AppContexttProvider = ({ children }) => {
  return <AppContextt.Provider>{children}</AppContextt.Provider>;
};
