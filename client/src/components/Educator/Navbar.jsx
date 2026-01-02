import { dummyEducatorData } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { UserRound } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();
  return (
    <>
      <div
        className={`fixed w-full z-99 flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b py-4  bg-(--color-bg-card) border-(--color-border) text-(--color-text-main)`}
      >
        <Link to="/" className="font-bold text-3xl cursor-pointer">
          Edemy
        </Link>
        <p className="text-(--color-primary)">
          <span className="text-(--color-text-main) me-1">Hi ! </span>{" "}
          {user ? user.fullName : "Developer"}{" "}
        </p>
        {user ? <UserButton /> : <UserRound />}
      </div>
    </>
  );
};

export default Navbar;
