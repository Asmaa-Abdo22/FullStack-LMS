import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContextt } from "../../Context/AppContext";
import Loading from "../../components/Student/Loading";
import { MoveDown, Star } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
  } = useContext(AppContextt);

  const fetchCourseData = () => {
    setCourseData(allCourses.find((course) => course._id === id));
  };

  useEffect(() => {
    fetchCourseData();
  }, [id, allCourses]);

  return (
    <>
      {courseData ? (
        <div className="px-7 md:px-8 lg:px-36 pt-18 md:pt-32 flex flex-col-reverse justify-between items-start md:flex-row gap-10">
          {/* left */}
          <div className="w-full md:w-[55%] flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">{courseData?.courseTitle}</h1>
            <p
              className="pt-4 "
              dangerouslySetInnerHTML={{
                __html: courseData?.courseDescription.slice(0, 200),
              }}
            ></p>
            {/* ratings */}
            <div className="flex gap-2 items-center">
              <span className="font-bold text-(--color-text-main)">
                {calculateRating(courseData)}
              </span>
              <div className="flex ">
                {[...Array(calculateRating(courseData))].map((item) => (
                  <Star
                    key={item}
                    fill="orange"
                    color="orange"
                    size={16}
                    className="stroke-orange-400"
                  />
                ))}
                <Star
                  fill="#e5e7eb"
                  color="#9ca3af"
                  size={16}
                  className="stroke-gray-300"
                />
              </div>
              <div className="flex gap-1">
                (<span>{courseData.courseRatings.length}</span>ratings
                <span></span>)
              </div>
              <div className="flex gap-1">
                <span>{courseData.enrolledStudents.length}</span>
                <span>students</span>
              </div>
            </div>
            {/* Instructor Name */}
            <div className="flex gap-1">
              <p>Course By</p>{" "}
              <h3 className="underline font-semibold capitalize text-blue-400">
                greatStack
              </h3>
            </div>
            <div className="pt-8 text-gray-300">
              <h2 className="text-xl font-semibold">Course Structure</h2>
              <div className="pt-5">
                {courseData.courseContent.map((chapter, index) => (
                  <div key={index}>
                    <div>
                      <div>
                        <MoveDown />
                        <p>{chapter.chapterTitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right */}
          <div className="w-full md:w-[35%]"></div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CourseDetails;
