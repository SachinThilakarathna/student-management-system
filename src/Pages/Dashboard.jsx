import React, { useState } from 'react';
import Slidebar from '../Components/Slidebar/Slidebar';
import Slidebarheader from '../Components/Header/Slidebarheader';
import TotalCourses from '../Components/Totalcount/TotalCourses';
import TotalStudents from '../Components/Totalcount/TotalStudents';
import LogDetailsAuditLogs from '../Components/AudtitLogs/LogDetailsAuditLogs';

function Dashboard() {

  return (
    <>
      <Slidebar />
      <Slidebarheader heading="Dashboard" />
      <div className="pt-30 ml-64 z-10 bg-gray-100 h-screen">

        <div className="max-w-5xl mx-auto p-6 bg-white">

          <div className="mb-6">
            <h1 className="relative font-bold text-[19px] sm:text-[20px] md:text-[23px] text-[#c46f0f]">
              Overview
            </h1>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-5">
            <div className="relative bg-gray-300 w-60 h-30 flex flex-col items-center justify-center rounded-xl text-center">
              <h1 className=" font-bold text-sm sm:text-lg md:text-[18px] text-[#68064f]">Student</h1>
              <TotalStudents/>
            </div>
            <div className="relative bg-gray-300 w-60 h-30 flex flex-col items-center justify-center rounded-xl text-center">
              <h1 className="font-bold text-sm sm:text-lg md:text-[18px] text-[#68064f]">Courses</h1>
              <TotalCourses/>
            </div>
          </div>
          
        </div>
        <LogDetailsAuditLogs/>

      </div>
    </>
  );
}

export default Dashboard;
