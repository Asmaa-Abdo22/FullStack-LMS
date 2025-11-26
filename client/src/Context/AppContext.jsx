import { createContext } from "react";

export const AppContextt = createContext(0);
export const AppContexttProvider = ({ children }) => {
  let value = {

  };
  return <AppContextt.Provider value={value}>{children}</AppContextt.Provider>;
};
