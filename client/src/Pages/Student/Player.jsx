import { useParams } from "react-router-dom";
import { AppContextt } from "../../Context/AppContext";
import { useState, useContext, useEffect } from "react";
import {  CirclePlay,  MoveDown } from "lucide-react";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Rating from "../../components/Student/Rating";

const Player = () => {
  const { calculateChapterTime, enrolledCourses } = useContext(AppContextt);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [playerData, setPlayerData] = useState(null);

  const getCourseData = () => {
    setCourseData(enrolledCourses.find((course) => course._id === courseId));
  };
  useEffect(() => {
    getCourseData();
  }, [enrolledCourses, courseId]);
  return (
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
                        <CirclePlay className="text-(--color-primary) shrink-0 mt-0.5" />
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
            <Rating userRating={0} />
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
                <button className="cursor-pointer px-4 py-1 bg-linear-to-r from-(--color-primary) to-(--color-primary-light)/60 text-(--color-text-white) rounded-lg font-medium hover:shadow-lg  active:scale-95 transition-all duration-300">
                  {false ? "Completed" : "Mark Complete"}
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
  );
};

export default Player;
