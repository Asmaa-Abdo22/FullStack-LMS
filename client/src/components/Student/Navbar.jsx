import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { User, Sun, Moon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext, useState } from "react";
import { applyTheme } from "../../ThemeToogle";
import { AppContextt } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCourseLiStPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };
  const { isEducator, setIsEducator, getToken, backendUrl } =
    useContext(AppContextt);

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(
        `${backendUrl}/api/educator/update-role`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`fixed w-full z-99 flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b py-4 
      ${
        isCourseLiStPage ? "bg-(--color-bg-card)" : "bg-(--color-bg-secondary)"
      } 
      border-(--color-border) text-(--color-text-main)`}
    >
      {/* Logo */}
      <h2
        className="font-bold text-3xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Edemy
      </h2>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5 text-(--color-text-secondary)">
        <div className="flex items-center gap-5 cursor-pointer">
          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="cursor-pointer"
              >
                {isEducator ? " Educator Dashboard" : "Become Educator"}
              </button>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="cursor-pointer bg-(--color-primary) text-(--color-text-white) px-5 py-1.5 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-(--color-text-secondary)">
        <div className="flex items-center gap-2 cursor-pointer">
          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="cursor-pointer text-sm"
              >
                {isEducator ? " Educator Dashboard" : "Become Educator"}
              </button>
              <Link to="/my-enrollments" className="text-sm">
                My Enrollments
              </Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="flex cursor-pointer items-center gap-2 bg-(--color-primary) text-(--color-text-white) px-3 py-1 text-sm rounded-full"
          >
            <User size={16} /> Create Account
          </button>
        )}
      </div>

      {/* Theme Toggle */}
      <button onClick={toggleTheme} className="cursor-pointer ml-4">
        {theme === "dark" ? <Sun color="gold" size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default Navbar;
