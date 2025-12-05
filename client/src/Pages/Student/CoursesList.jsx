import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../components/Student/SearchBar";
import { useContext, useEffect, useState } from "react";
import { AppContextt } from "../../Context/AppContext";
import CourseCard from "../../components/Student/CourseCard";
import { X } from "lucide-react";

const CoursesList = () => {
  const navigate = useNavigate();
  const { input } = useParams();
  const { allCourses } = useContext(AppContextt);
  const [filteredCours, setFilteredCourse] = useState([]);
  useEffect(() => {
    if (!input) {
      setFilteredCourse(allCourses);
    } else {
      const result = allCourses.filter((item, index) =>
        item.courseTitle.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCourse(result);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="px-7 md:px-8 lg:px-36 pt-32">
        <div className="flex items-center p-3 justify-between flex-col md:flex-row w-full gap-6 bg-(--color-bg-card) border border-(--color-border) rounded-xl shadow-card">
          <div className="w-full md:w-1/5">
            <h1 className="text-2xl md:text-3xl font-bold text-(--color-text-main)">
              Course List
            </h1>
            <p className="text-(--color-text-secondary) mt-2">
              <span
                className="text-(--color-primary) cursor-pointer hover:text-(--color-primary-dark) transition-colors duration-200"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              /{" "}
              <span className="text-(--color-text-secondary)">Course list</span>
            </p>
          </div>
          <div className="w-full md:flex-1">
            <SearchBar data={input} />
          </div>
        </div>

        {/* remove  */}
        {input && (
          <div className="flex items-center gap-2 mt-10 border border-(--color-border) rounded-xl w-fit text-sm px-4 py-2">
            <p className="capitalize">{input}</p>
            <span>
              {" "}
              <X
                size={17}
                className="cursor-pointer"
                onClick={() => {
                 navigate("/course-list") ; 
                }}
              />
            </span>
          </div>
        )}
        {/* list of courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-15">
          {filteredCours.map((item, index) => (
            <CourseCard key={index} course={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursesList;
