import { useContext } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { AppContextt } from "../../Context/AppContext";

const CourseSection = () => {
  const { allCourses } = useContext(AppContextt);
  return (
    <>
      <div className="py-16 md:px-40 px-3 ">
        <h2 className="text-xl md:text-3xl font-medium text-(--color-primary) capitalize">
          Learn from the best
        </h2>
        <p className="text-sm md:text-base mt-4  mb-15 font-medium text-(--color-text-secondary) text-justify md:text-center">
          Discover our top-rated courses across various categories. From coding
          and design to <br/> business and wellness, our courses are crafted to
          deliver results.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0 my-10 md:my-16 ">
          {allCourses.slice(0, 4).map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
        <Link
          className="px-10 py-3  rounded  text-(--color-primary-dark) border border-(--color-border)"
          to="/course-list"
          onClick={() =>
            scrollTo({
              behavior: "smooth",
              left: 0,
              top: 0,
            })
          }
        >
          Show All Courses
        </Link>
      </div>
    </>
  );
};

export default CourseSection;
