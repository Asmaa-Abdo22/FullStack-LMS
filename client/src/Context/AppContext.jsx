import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
export const AppContextt = createContext(0);
export const AppContexttProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { getToken } = useAuth();
  const { user } = useUser();
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
  //*  Function to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((item, i) => {
      time += item.lectureDuration;
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };
  //*  Function to calculate  course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((item) => {
        time += item.lectureDuration;
      });
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };
  //*  Function to calculate  no of lectures in the course

  const calculateNoOfLectures = (course) => {
    let totallectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totallectures += chapter.chapterContent.length;
      }
    });
    return totallectures;
  };

  //* Fetch User Enrolled Courses
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  };
  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);
  const logToken = async () => {
    console.log(await getToken());
  };

  useEffect(() => {
    if (user) {
      logToken();
    }
  }, [user]);
  let value = {
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    enrolledCourses,
    fetchUserEnrolledCourses,
  };
  return <AppContextt.Provider value={value}>{children}</AppContextt.Provider>;
};
