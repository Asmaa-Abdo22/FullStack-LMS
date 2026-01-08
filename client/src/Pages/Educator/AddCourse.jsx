import uniqid from "uniqid";
import Quill from "quill";
import UploadICON from "../../assets/uploadIcon.png";
import { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, LocateFixed, X } from "lucide-react";
import { AppContextt } from "../../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddCourse = () => {
  const {
   
    getToken,
    backendUrl,
  } = useContext(AppContextt);
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!image) {
        toast.error("Thumbnail Not Selected ");
      }
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };
      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/educator/add-course`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML=""
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );

    setShowPopup(false);
    setLectureDetails({
      lecturer: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-start gap-8 p-4 w-full mb-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl w-full flex flex-col space-y-5"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="text-(--color-text-main)">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter Title"
              className="border border-(--color-border) p-2 rounded focus:outline-0 bg-(--color-bg-card) text-(--color-text-main)"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-(--color-text-main)">Course Description</p>
            <div ref={editorRef}></div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="price" className="text-(--color-text-main)">
                Course Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                min={0}
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="border border-(--color-border) p-2 rounded focus:outline-0 bg-(--color-bg-card) text-(--color-text-main)"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-(--color-text-main)">Course Thumbnail</p>
              <label htmlFor="thumbnail" className="flex items-center gap-3">
                <img
                  src={UploadICON}
                  alt="upload"
                  className="w-7 h-7 cursor-pointer"
                />
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                  src={image ? URL.createObjectURL(image) : ""}
                  alt=""
                  className="max-h-10 rounded border border-(--color-border)"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-(--color-text-main)">Discount %</p>
            <input
              type="number"
              name="discount"
              id="discount"
              value={discount}
              placeholder="0"
              min={0}
              max={100}
              onChange={(e) => setDiscount(e.target.value)}
              className="border border-(--color-border) p-2 rounded focus:outline-0 bg-(--color-bg-card) text-(--color-text-main)"
            />
          </div>

          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="bg-(--color-bg-card) border border-(--color-border) rounded-lg mb-4"
            >
              <div className="flex justify-between items-center p-4 border-b border-(--color-border)">
                <div className="flex items-center">
                  <ChevronDown
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    className={`mr-2 cursor-pointer transition-all text-(--color-primary) ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                  />
                  <span className="font-semibold text-(--color-text-main)">
                    {chapterIndex + 1} {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-(--color-text-secondary)">
                  {chapter.chapterContent.length} Lectures
                </span>
                <X
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                  className="cursor-pointer text-(--color-primary)"
                />
              </div>

              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2 py-2 border-b border-(--color-border) last:border-b-0"
                    >
                      <span className="text-(--color-text-main)">
                        {lectureIndex + 1} {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-(--color-primary)"
                        >
                          link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <X
                        className="cursor-pointer text-(--color-primary)"
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                      />
                    </div>
                  ))}
                  <div
                    onClick={() => handleLecture("add", chapter.chapterId)}
                    className="inline-flex p-2 rounded bg-(--color-bg-secondary) mt-2 cursor-pointer text-(--color-text-main)"
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}

          <div
            onClick={() => handleChapter("add")}
            className="flex justify-center items-center p-2 rounded bg-(--color-primary)/10 mt-2 cursor-pointer text-(--color-primary) hover:bg-(--color-primary)/20 transition-colors"
          >
            + Add Chapter
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-(--color-bg-card) text-(--color-text-main) p-6 rounded-lg relative w-full max-w-96 border border-(--color-border)">
                <X
                  className="absolute top-3 right-3 cursor-pointer text-red-500"
                  size={24}
                  onClick={() => setShowPopup(false)}
                />
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                <div className="mb-3">
                  <p className="text-(--color-text-main)">Lecture Title</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-(--color-border) rounded py-2 px-3 bg-(--color-bg-card) text-(--color-text-main) focus:outline-0"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <p className="text-(--color-text-main)">Duration (minutes)</p>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-(--color-border) rounded py-2 px-3 bg-(--color-bg-card) text-(--color-text-main) focus:outline-0"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <p className="text-(--color-text-main)">Lecture URL</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-(--color-border) rounded py-2 px-3 bg-(--color-bg-card) text-(--color-text-main) focus:outline-0"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2 my-4 items-center">
                  <p className="text-(--color-text-main)">Is Preview Free?</p>
                  <input
                    type="checkbox"
                    className="scale-125 accent-(--color-primary)"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>
                <button
                  onClick={addLecture}
                  className="w-full bg-linear-to-r from-(--color-primary) to-(--color-primary-light)/50 text-white py-2 rounded-lg hover:shadow-lg transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-linear-to-r from-(--color-primary) to-(--color-primary-light)/50 text-white py-1.5 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer"
          >
            Add Course
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
