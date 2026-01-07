import { useParams } from "react-router-dom";
import { AppContextt } from "../../Context/AppContext";
import { useState, useContext, useEffect } from "react";
import { CheckCircle, CirclePlay, MoveDown } from "lucide-react";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Rating from "../../components/Student/Rating";
import { toast } from "react-toastify";
import Loading from "../../components/Student/Loading";
import axios from "axios";

const Player = () => {
  const {
    calculateChapterTime,
    enrolledCourses,
    userData,
    getToken,
    backendUrl,
    fetchUserEnrolledCourses,
  } = useContext(AppContextt);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    setCourseData(enrolledCourses.find((course) => course._id === courseId));
    enrolledCourses.map((course) => {
      course.courseRatings.map((item) => {
        if (item.userId === userData._id) {
          setInitialRating(item.rating);
        }
      });
    });
  };
  const markLectureAsCompleted = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-course-progress`,
        {
          courseId,
          lectureId: playerData.lectureId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/get-course-progress`,
        {
          courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleRate = async (rating) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/add-rating`,
        {
          courseId,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses, courseId]);
  useEffect(() => {
    getCourseProgress();
  }, []);

  return courseData ? (
    <>
      <div className="px-5 md:px-8 lg:px-36 pt-24 md:pt-32 flex flex-col justify-between items-start md:flex-row gap-8 mb-10 ">
        {/* left */}
        <div className="pt-4 w-full md:w-[55%]">
          <h2 className="text-xl font-semibold text-(--color-text-main)">
            Course Structure
          </h2>
          <div className="pt-4">
            {courseData?.courseContent?.map((chapter, index) => (
              <div
                key={index}
                className="border border-(--color-border) mb-3 rounded-lg overflow-hidden bg-(--color-bg-card)"
              >
                {/* Chapter Header */}
                <div
                  className="flex justify-between px-4 py-3 cursor-pointer bg-(--color-bg-secondary) hover:bg-(--color-bg-section) gap-2 transition-colors"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <div className="flex items-center gap-2">
                    <MoveDown
                      size={17}
                      className={`text-(--color-primary) ${
                        openIndex === index ? "rotate-180" : ""
                      } transition-transform duration-300`}
                    />
                    <p className="font-medium text-(--color-text-main)">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-sm text-(--color-text-secondary)">
                    {chapter.chapterContent.length} lectures -{" "}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>

                {/* Chapter Content */}
                {openIndex === index && (
                  <ul className="list-disc px-4 py-3 text-(--color-text-secondary)">
                    {chapter.chapterContent.map((lecture, idx) => (
                      <li
                        key={idx}
                        className="mt-1 flex items-start  py-2 border-b border-(--color-border-light) last:border-b-0 gap-2"
                      >
                        {progressData?.lectureCompleted?.includes(
                          lecture.lectureId
                        ) ? (
                          <CheckCircle className="text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <CirclePlay className="text-(--color-primary) shrink-0 mt-0.5" />
                        )}

                        <div className="flex items-center justify-between w-full">
                          <p className="text-(--color-text-main)">
                            {lecture.lectureTitle}
                          </p>
                          <div className="flex gap-3">
                            {lecture.lectureUrl && (
                              <p
                                onClick={() => {
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: idx + 1,
                                  });
                                }}
                                className="text-(--color-primary) cursor-pointer hover:text-(--color-primary-dark) transition-colors whitespace-nowrap"
                              >
                                Watch
                              </p>
                            )}
                            <p className="text-(--color-text-secondary) whitespace-nowrap">
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] }
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {/* rating the course */}
          <div className="flex items-center gap-2 py-3 mt-10">
            <h2 className="text-xl font-bold ">Rate This Course : </h2>
            <Rating userRating={initialRating} onRate={handleRate} />
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-[40%] py-5 px-5 rounded-xl border border-(--color-border) bg-(--color-bg-card) shadow-card  ">
          {playerData ? (
            <>
              <YouTube
                videoId={playerData.lectureUrl.split("/").at(-1)}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video rounded-lg"
              />
              <div className="flex items-center justify-between mt-4">
                <p className="text-(--color-text-secondary) font-medium">
                  {playerData.chapter} . {playerData.lecture} -
                  {playerData.lectureTitle}
                </p>
                <button
                  onClick={() => {
                    markLectureAsCompleted(playerData.lectureId);
                  }}
                  className="cursor-pointer px-4 py-1 bg-linear-to-r from-(--color-primary) to-(--color-primary-light)/60 text-(--color-text-white) rounded-lg font-medium hover:shadow-lg  active:scale-95 transition-all duration-300"
                >
                  {progressData &&
                  progressData.lectureCompleted.includes(playerData.lectureId)
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>
            </>
          ) : (
            <img
              src={courseData?.courseThumbnail}
              alt={courseData?.courseTitle}
              className="w-full rounded-lg"
            />
          )}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Player;
