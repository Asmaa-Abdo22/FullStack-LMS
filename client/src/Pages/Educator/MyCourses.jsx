import { useContext, useEffect, useState } from "react";
import { AppContextt } from "../../Context/AppContext";
import Loading from "../../components/Student/Loading";
import { toast } from "react-toastify";
import axios from "axios";

const MyCourses = () => {
  const { allCourses, getToken, backendUrl, isEducator } =
    useContext(AppContextt);

  const [courses, setCourses] = useState(null);
  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        `${backendUrl}/api/educator/courses`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isEducator && fetchEducatorCourses();
  }, [ isEducator]);

  if (!courses) return <Loading />;

  return (
    <>
      <div className="min-h-screen flex flex-col items-start gap-8 p-4">
        <h2 className="text-(--color-text-main) text-xl font-semibold">
          My Courses
        </h2>
        <table className="border border-(--color-border) bg-(--color-bg-card) rounded-lg w-full max-w-4xl table-fixed md:table-auto ">
          <thead>
            <tr className="border-b border-(--color-border) text-sm bg-(--color-bg-secondary) text-left">
              <th className="p-3 text-(--color-text-main) font-semibold">
                All Courses
              </th>
              <th className="p-3 text-(--color-text-main) font-semibold">
                Earnings
              </th>
              <th className="p-3 text-(--color-text-main) font-semibold">
                Students
              </th>
              <th className="p-3 text-(--color-text-main) font-semibold">
                Published On
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              return (
                <tr
                  key={course._id}
                  className="text-left  border-t border-(--color-border) hover:bg-(--color-bg-section)/40 transition"
                >
                  <td className="flex gap-2 items-center py-3 px-4">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="md:w-16 w-20 bg-cover rounded"
                    />
                    <span className="hidden md:block text-(--color-text-main)">
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-(--color-text-main)">
                    $ <span className="truncate">{course.coursePrice}</span>
                  </td>
                  <td className="py-3 px-4 text-(--color-text-secondary)">
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="py-3 px-4 truncate text-(--color-text-secondary)">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyCourses;
