import {
  LayoutDashboard,
  CirclePlus,
  GraduationCap,
  Users,
} from "lucide-react";
import { useContext, useState } from "react";
import { AppContextt } from "../../Context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isEducator } = useContext(AppContextt);
  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: <LayoutDashboard /> },
    { name: "Add Course", path: "/educator/add-course", icon: <CirclePlus /> },
    {
      name: "My Courses ",
      path: "/educator/my-courses",
      icon: <GraduationCap />,
    },
    {
      name: "Student Enrolled ",
      path: "/educator/student-enrolled",
      icon: <Users />,
    },
  ];
  return (
    isEducator && (
      <div className="flex flex-col gap-4 pt-20 border-r border-(--color-border) min-h-screen bg-(--color-bg-card) w-10 md:w-64 items-center ">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-2  w-full  transition-colors duration-300 ${
                isActive 
                  ? " bg-(--color-bg-secondary) border-r-[6px] border-r-(--color-primary-light)"
                  : "bg-(--color-bg-section)/20"
              }`
            }
          >
            <span className="w-6 h-6"> {item.icon}</span>{" "}
            <span className="hidden md:block">{item.name}</span>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;