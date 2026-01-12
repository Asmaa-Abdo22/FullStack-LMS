import { useContext, useState } from "react";
import { AppContextt } from "../../Context/AppContext";
import {  useNavigate } from "react-router-dom";
import { Line } from "rc-progress";
import { Clock, CheckCircle, PlayCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    userData,
    fetchUserEnrolledCourses,
    getToken,
    backendUrl,
    calculateNoOfLectures,
  } = useContext(AppContextt);
  const [progressArray, setProgressArray] = useState([]);
  const navigate = useNavigate();
  const getCourseProgress = async () => {
    try {
      if (!backendUrl) {
        console.error("Backend URL is not configured");
        return;
      }
      const token = await getToken();
      if (!token) {
        console.error("Token not available");
        return;
      }
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          try {
            const { data } = await axios.post(
              `${backendUrl}/api/user/get-course-progress`,
              { courseId: course._id },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            let totalLectures = calculateNoOfLectures(course);
            const lectureCompleted = data.progressData
              ? data.progressData.lectureCompleted.length
              : 0;
            return { totalLectures, lectureCompleted };
          } catch (error) {
            console.error(`Error fetching progress for course ${course._id}:`, error);
            // Return default progress for this course
            return { totalLectures: calculateNoOfLectures(course), lectureCompleted: 0 };
          }
        })
      );
      setProgressArray(tempProgressArray);
    } catch (error) {
      console.error("Error fetching course progress:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to fetch course progress";
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData]);
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);

  return (
    <div className="px-4 md:px-8 lg:px-36 pt-24 md:pt-32 mb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-(--color-text-main)">
          My Enrollments
        </h1>
        <p className="text-(--color-text-secondary) mt-2">
          Track your learning progress and continue your journey
        </p>
      </div>

      {/* Courses Table/Cards */}
      <div className="bg-(--color-bg-card) border border-(--color-border) rounded-xl shadow-card overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-(--color-border) bg-(--color-bg-secondary) ">
                <th className="px-6 py-4 text-left font-semibold text-(--color-text-main) ">
                  Course
                </th>
                <th className="px-6 py-4 text-left font-semibold text-(--color-text-main)">
                  Duration
                </th>
                <th className="px-6 py-4 text-left font-semibold text-(--color-text-main)">
                  Progress
                </th>
                <th className="px-6 py-4 text-left font-semibold text-(--color-text-main)">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-semibold text-(--color-text-main)">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course, indexx) => {
                const progress = progressArray[indexx]
                  ? (progressArray[indexx].lectureCompleted * 100) /
                    progressArray[indexx].totalLectures
                  : 0;
                const isCompleted =
                  progressArray[indexx] &&
                  progressArray[indexx].lectureCompleted ===
                    progressArray[indexx].totalLectures;

                return (
                  <tr
                    key={indexx}
                    className="border-b border-(--color-border) last:border-b-0 hover:bg-(--color-bg-secondary)/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={course.courseThumbnail}
                          alt={course.courseTitle}
                          className="w-16 h-16 rounded-lg object-contain"
                        />
                        <div>
                          <p className="font-medium text-(--color-text-main) line-clamp-1">
                            {course.courseTitle}
                          </p>
                          <div className="mt-2">
                            <Line
                              percent={progress}
                              strokeWidth={3}
                              strokeColor="var(--color-primary)"
                              trailColor="var(--color-border)"
                              className="w-50"
                            />
                            <p className="text-xs text-(--color-text-secondary) mt-1">
                              {Math.round(progress)}% Complete
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-(--color-text-secondary)">
                        <Clock size={16} />
                        <span>{calculateCourseDuration(course)}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-(--color-text-secondary)">
                        {progressArray[indexx] && (
                          <>
                            <span className="font-medium text-(--color-text-main)">
                              {progressArray[indexx].lectureCompleted}
                            </span>
                            <span>
                              {" "}
                              of {progressArray[indexx].totalLectures} lessons
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                          isCompleted
                            ? "bg-green-500/10 text-green-600"
                            : "bg-(--color-primary)/10 text-(--color-primary)"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle size={14} />
                            Completed
                          </>
                        ) : (
                          "In Progress"
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/player/${course._id}`)}
                        className={`px-4 py-2 cursor-pointer rounded-lg font-medium transition-all duration-300 ${
                          isCompleted
                            ? "bg-linear-to-r from-green-500 to-green-400 hover:shadow-lg text-white"
                            : "bg-linear-to-r from-(--color-primary) to-(--color-primary)/70 hover:shadow-lg text-white "
                        }`}
                      >
                        {isCompleted ? "Review" : "Continue"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {enrolledCourses.map((course, indexx) => {
            const progress = progressArray[indexx]
              ? (progressArray[indexx].lectureCompleted * 100) /
                progressArray[indexx].totalLectures
              : 0;
            const isCompleted =
              progressArray[indexx] &&
              progressArray[indexx].lectureCompleted ===
                progressArray[indexx].totalloctures;

            return (
              <div
                key={indexx}
                className="border-b border-(--color-border) last:border-b-0 p-4 hover:bg-(--color-bg-secondary)/50 transition-colors"
              >
                <div className="flex gap-4">
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-(--color-text-main) line-clamp-2">
                      {course.courseTitle}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-(--color-text-secondary) text-sm">
                        <Clock size={14} />
                        <span>{calculateCourseDuration(course)}</span>
                      </div>

                      <span
                        className={`text-sm font-medium ${
                          isCompleted
                            ? "text-green-600"
                            : "text-(--color-primary)"
                        }`}
                      >
                        {isCompleted ? "Completed" : `${Math.round(progress)}%`}
                      </span>
                    </div>

                    <div className="mt-3">
                      <Line
                        percent={progress}
                        strokeWidth={3}
                        strokeColor="var(--color-primary)"
                        trailColor="var(--color-border)"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm text-(--color-text-secondary)">
                        {progressArray[indexx] && (
                          <span>
                            {progressArray[indexx].lectureCompleted}/
                            {progressArray[indexx].totalLectures} lessons
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => navigate(`/player/${course._id}`)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          isCompleted
                            ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                            : "bg-linear-to-r from-(--color-primary) to-(--color-primary)/70 text-white hover:shadow-md"
                        }`}
                      >
                        {isCompleted ? "Review" : "Continue"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {enrolledCourses.length === 0 && (
        <div className="text-center py-16 border border-(--color-border) rounded-xl bg-(--color-bg-card)">
          <div className="w-20 h-20 mx-auto rounded-full bg-linear-to-r from-(--color-primary)/10 to-(--color-primary-light)/10 flex items-center justify-center mb-4">
            <PlayCircle className="text-(--color-primary)" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-(--color-text-main) mb-2">
            No Enrollments Yet
          </h3>
          <p className="text-(--color-text-secondary) max-w-md mx-auto mb-6">
            Start your learning journey by enrolling in courses that interest
            you
          </p>
          <button
            onClick={() => navigate("/course-list")}
            className="bg-linear-to-r cursor-pointer from-(--color-primary) to-(--color-primary)/70 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default MyEnrollments;
