import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContextt } from "../../Context/AppContext";
import Loading from "../../components/Student/Loading";
import { BookOpen, CirclePlay, Clock, MoveDown, Star } from "lucide-react";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import axios from "axios";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContextt);

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const enrollCourse = async () => {
    if (!userData) {
      return toast.warn("Login To Enroll");
    }
    if (isAlreadyEnrolled) {
      return toast.warn(" Already Enrolled");
    }
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        {
          courseId: courseData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        const { sessionUrl } = data;
        window.location.replace(sessionUrl);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchCourseData();
  }, [id]);
  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData?.enrolledCourses?.includes(courseData._id)|| false);
    }
  }, [userData, courseData]);

  const [openIndex, setOpenIndex] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  return (
    <>
      {courseData ? (
        <div className="px-5 md:px-8 lg:px-36 pt-24 md:pt-32 flex flex-col justify-between items-start md:flex-row gap-8 mb-10">
          {/* left */}
          <div className="w-full md:w-[55%] flex flex-col space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-(--color-text-main)">
              {courseData?.courseTitle}
            </h1>
            <p
              className="pt-2 text-(--color-text-secondary)"
              dangerouslySetInnerHTML={{
                __html: courseData?.courseDescription.slice(0, 200),
              }}
            ></p>

            {/* ratings */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="font-bold text-(--color-text-main)">
                {calculateRating(courseData)}
              </span>
              <div className="flex">
                {[...Array(calculateRating(courseData))].map((_, index) => (
                  <Star
                    key={index}
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
              <div className="flex gap-1 text-(--color-text-secondary)">
                (<span>{courseData.courseRatings.length}</span>
                <span>ratings</span>)
              </div>
              <div className="flex gap-1 text-(--color-text-secondary)">
                <span>{courseData.enrolledStudents.length}</span>
                <span>students</span>
              </div>
            </div>

            {/* Instructor Name */}
            <div className="flex gap-1 text-(--color-text-secondary)">
              <p>Course By</p>{" "}
              <h3 className="font-semibold capitalize text-(--color-primary) hover:text-(--color-primary-dark) transition-colors">
                {courseData?.educator?.name}
              </h3>
            </div>

            {/* Course Structure */}
            <div className="pt-6">
              <h2 className="text-xl font-semibold text-(--color-text-main)">
                Course Structure
              </h2>
              <div className="pt-4">
                {courseData?.courseContent.map((chapter, index) => (
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
                            <CirclePlay className="text-(--color-primary) shrink-0 mt-0.5" />
                            <div className="flex items-center justify-between w-full">
                              <p className="text-(--color-text-main)">
                                {lecture.lectureTitle}
                              </p>
                              <div className="flex gap-3">
                                {lecture.isPreviewFree && (
                                  <p
                                    onClick={() => {
                                      setPlayerData({
                                        videoId: lecture.lectureUrl
                                          .split("/")
                                          .at(-1),
                                      });
                                    }}
                                    className="text-(--color-primary) cursor-pointer hover:text-(--color-primary-dark) transition-colors whitespace-nowrap"
                                  >
                                    Preview
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
            </div>

            {/* Course description */}
            <div className="py-8">
              <h3 className="text-xl font-semibold text-(--color-text-main)">
                Course Description
              </h3>
              <p
                className="pt-3 text-(--color-text-secondary)"
                dangerouslySetInnerHTML={{
                  __html: courseData?.courseDescription,
                }}
              ></p>
            </div>
          </div>

          {/* right */}
          <div className="w-full md:w-[40%] py-5 px-5 rounded-xl border border-(--color-border) bg-(--color-bg-card) shadow-card  ">
            {playerData ? (
              <YouTube
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video rounded-lg"
              />
            ) : (
              <img
                src={courseData.courseThumbnail}
                alt={courseData?.courseTitle}
                className="w-full rounded-lg"
              />
            )}

            {/* details */}
            <div className="my-6 flex flex-col space-y-6">
              <p className="flex text-(--color-primary) gap-2 items-center bg-linear-to-r from-(--color-primary)/10 to-transparent p-3 rounded-lg">
                <Clock size={17} />
                <span>
                  <span className="font-bold pr-1">5 days</span> left at this
                  price{" "}
                </span>
              </p>

              {/* price */}
              <div className="flex gap-3 items-center">
                <p className="text-2xl md:text-3xl font-bold text-(--color-text-main)">
                  ${" "}
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(2)}
                </p>
                <p className="line-through text-(--color-text-secondary)">
                  $ {courseData.coursePrice}
                </p>
                <p className="text-(--color-primary) font-semibold bg-linear-to-r from-(--color-primary)/10 to-transparent px-2 py-1 rounded">
                  {courseData.discount}% Off
                </p>
              </div>

              {/* rating */}
              <div className="flex gap-4 items-center text-(--color-text-secondary)">
                <div className="flex gap-2 items-center">
                  <Star
                    fill="orange"
                    color="orange"
                    size={16}
                    className="stroke-orange-400"
                  />
                  <span>{calculateRating(courseData)}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Clock size={16} />
                  <span>{calculateCourseDuration(courseData)}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <BookOpen size={16} />
                  <span>{calculateNoOfLectures(courseData)} Lessons</span>
                </div>
              </div>

              {/* enrolled button */}
              <button
                onClick={enrollCourse}
                className="w-full cursor-pointer bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) text-(--color-text-white) font-semibold rounded-lg py-3 hover:shadow-lg   transition-all duration-300"
              >
                {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>

              {/* what in course */}
              <div className="flex flex-col space-y-3">
                <p className="capitalize font-medium text-(--color-text-main)">
                  What is in the course?
                </p>
                <ul className="space-y-2">
                  {[
                    "Lifetime access with free updates",
                    "Step-by-step hands-on project guidance",
                    "Downloadable resources and source code",
                    "Quizzes to test your knowledge",
                    "Certificate of completion",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-linear-to-r from-(--color-primary)/20 to-(--color-primary-light)/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-linear-to-r from-(--color-primary) to-(--color-primary-light)"></div>
                      </div>
                      <span className="text-(--color-text-secondary)">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CourseDetails;
