import React, { useState, useEffect } from "react";
import { Slidelink, Slidelink2 } from "../Link/Slidelink.jsx";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import LogoutLink from "../LogoutLink.jsx";

function Slidebar() {
  const [isVisible, setIsVisible] = useState(
    localStorage.getItem("menuVisible") === "true"
  );

  // Save menu state when it changes, unless it's a log-out action
  const handleLogOut = () => {
    // Optional: Do your log-out logic here (API call, etc.)
    // For now, just navigate or update state as needed
    localStorage.removeItem("menuVisible"); // Optionally clear on logout
  };

  // Save visibility state unless it's logout-related
  useEffect(() => {
    if (window.location.pathname !== '/logout') {
      localStorage.setItem("menuVisible", isVisible);
    }
  }, [isVisible]);

  return (
    <>
      {/* Sidebar Section */}
      <div className="fixed top-0 left-0 h-full items-center px-[50px] py-[10px] bg-[radial-gradient(circle,_#9f06c9,_#340138)] w-64 min-h-screen space-y-10">
        <img src="akura-logo.png" alt="logo" className="h-20 pt-5 pb-5" />

        <div className="relative font-semibold space-y-4">
          <Slidelink linkname="Dashboard" linkurl="/dashboard" />
          <Slidelink linkname="Course" linkurl="/course" />

          {/* Manage Student Section */}
          <div className="flex">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-gray-100 hover:text-[#F6941F]"
            >
              Manage Student
            </button>
            <IoMdArrowDropdown className="text-gray-100 mt-1 ml-4" />
          </div>

          {/* Submenu: Keep Visible */}
          <div className={`${isVisible ? "block" : "hidden"} pl-4 space-y-4`}>
            <Slidelink2 linkname2="Add Student" linkurl2="/addstudent" />
            {/* <Slidelink2 linkname2="Remove Student" linkurl2="/removestudent" /> */}
            <Slidelink2 linkname2="View Students Details" linkurl2="/viewstudentdetails" />
            {/* <Slidelink2 linkname2="Edit Student Details" linkurl2="/editStudentpage" /> */}
          </div>

          <Slidelink linkname="Audit Logs" linkurl="/auditlogs" />
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-10 text-[#d6d6d6] font-semibold space-y-4">
          <div className="flex">
            <IoIosSettings className="mt-1 mr-2 w-5 h-5" />
            <Slidelink linkname="Settings" linkurl="/settings" />
          </div>

          {/* Log out Section - Disables Sidebar State Reset on Click */}
          <div
            className="flex hover:text-[#F6941F]"
            onClick={handleLogOut}
          >
            <RiLogoutBoxRLine className="mt-1 mr-2 w-5 h-5 text-[#d6d6d6]" />
            {/* <Slidelink linkname="Log out" linkurl="/logout" /> */}
            <LogoutLink/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slidebar;
