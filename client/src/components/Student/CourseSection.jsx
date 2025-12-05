import { useContext } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { AppContextt } from "../../Context/AppContext";

const CourseSection = () => {
  const { allCourses } = useContext(AppContextt);
  return (
    <>
      <div className="py-16 mt-25 md:mt-95 lg:mt-20 md:px-40 px-3 ">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
         
          <h2 className="text-2xl md:text-4xl font-bold text-(--color-primary) mb-4">
            Learn from the best
          </h2>
          <p className="text-base md:text-lg text-(--color-text-secondary) max-w-3xl mx-auto leading-relaxed">
            Discover our top-rated courses across various categories. From
            coding and design to <br /> business and wellness, our courses are
            crafted to deliver results.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 px-2 md:px-0 my-10 md:my-16 ">
          {allCourses.slice(0, 4).map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
        <Link
          className="px-10 py-3 rounded-lg font-semibold text-(--color-primary-dark) bg-(--color-bg-secondary) hover:bg-(--color-bg-section) border border-(--color-border) hover:border-(--color-primary) transition-all duration-300  hover:shadow-card"
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
