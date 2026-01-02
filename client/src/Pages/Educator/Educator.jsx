import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Educator/Navbar";
import Sidebar from "../../components/Educator/Sidebar";
import Footer from "../../components/Educator/Footer";

const Educator = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-start  gap-4">
        <Sidebar  />
       <div className="grow pt-20"> {<Outlet />}</div>
      </div>
      <Footer/>
    </>
  );
};

export default Educator;
