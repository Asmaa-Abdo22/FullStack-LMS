import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContextt = createContext(0);
export const AppContexttProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([]);
  //* Fetch All Courses
  const fetchAllCourses = async () => {
    try {
      setAllCourses(dummyCourses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCourses()
  }, [])
  
  let value = {
    allCourses
  };
  return <AppContextt.Provider value={value}>{children}</AppContextt.Provider>;
};
