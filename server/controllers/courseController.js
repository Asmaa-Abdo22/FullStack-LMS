import Course from "../models/Course.js";

// Get All Courses
export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select("-courseContent -enrolledStudents")
      .populate({
        path: "educator",
        select: "name imageUrl",
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      courses,
      totalCourses: courses.length,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCourseId = async (req, res) => {
  const { id } = req.params;

  try {
    const courseData = await Course.findById(id)
      .populate({
        path: "educator",
        select: "name imageUrl bio",
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "chapterContent",
        },
      });

    if (!courseData) {
      return res.json({
        success: false,
        message: "Course not found",
      });
    }

    // Remove lectureUrl if isPreviewFree is false
    if (courseData.courseContent) {
      courseData.courseContent.forEach((chapter) => {
        if (chapter.chapterContent) {
          chapter.chapterContent.forEach((lecture) => {
            if (!lecture.isPreviewFree) {
              lecture.lectureUrl = "";
            }
          });
        }
      });
    }

    res.json({
      success: true,
      courseData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


