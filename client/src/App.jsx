import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Student/Home";
import CoursesList from "./Pages/Student/CoursesList";
import CourseDetails from "./Pages/Student/CourseDetails";
import MyEnrollments from "./Pages/Student/MyEnrollments";
import Player from "./Pages/Student/Player";
import Loading from "./components/Student/Loading";
import Educator from "./Pages/Educator/Educator";
import Dashboard from "./Pages/Educator/Dashboard";
import AddCourse from "./Pages/Educator/AddCourse";
import MyCourses from "./Pages/Educator/MyCourses";
import StudentsEnrolled from "./Pages/Educator/StudentsEnrolled";
import MainLayout from "./components/MainLayout";

function App() {
  const myRoutes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/course-list", element: <CoursesList /> },
        { path: "/course-list/:input", element: <CoursesList /> },
        { path: "/course/:id", element: <CourseDetails /> },
        { path: "/my-enrollments", element: <MyEnrollments /> },
        { path: "/player/:courseId", element: <Player /> },
        { path: "/loading/:path", element: <Loading /> },
        // Educator
        {
          path: "/educator",
          element: <Educator />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: "add-course", element: <AddCourse /> },
            { path: "my-courses", element: <MyCourses /> },
            { path: "student-enrolled", element: <StudentsEnrolled /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={myRoutes} />
    </>
  );
}

export default App;
