import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { User } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
const Navbar = () => {
  const isCourseLiStPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <>
      <div
        className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
          isCourseLiStPage ? "bg-white" : "bg-cyan-100/70"
        }`}
      >
        <img
          src={assets.logo}
          alt="logo"
          className="w-28 lg:w-32 cursor-pointer"
        />
        <div className="hidden md:flex items-center gap-5 text-gray-500">
          <div className="flex items-center gap-5 cursor-pointer">
            {user && (
              <>
                <button className="cursor-pointer">Become Educator</button>
                <Link to="/my-enrollments">My Enrollments</Link>
              </>
            )}
          </div>

          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => {
                openSignIn();
              }}
              className="bg-blue-600 text-white px-5 py-1.5 cursor-pointer rounded-full"
            >
              Create Account
            </button>
          )}
        </div>

        {/* Mobile screen */}
        <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
          <div className="flex items-center gap-2 cursor-pointer">
            <button className="cursor-pointer text-sm ">Become Educator</button>
            <Link to="/my-enrollments text-sm">My Enrollments</Link>
          </div>
          <User />
        </div>
      </div>
    </>
  );
};

export default Navbar;
