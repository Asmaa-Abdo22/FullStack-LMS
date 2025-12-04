import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContextt = createContext(0);
export const AppContexttProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  //* Fetch All Courses
  const fetchAllCourses = async () => {
    try {
      setAllCourses(dummyCourses);
    } catch (error) {
      console.log(error);
    }
  };
  //*  Function to calculate average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length == 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };
   //* Fetch All Testimonials
   
  useEffect(() => {
    fetchAllCourses();
  }, []);

  let value = {
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
  };
  return <AppContextt.Provider value={value}>{children}</AppContextt.Provider>;
};
