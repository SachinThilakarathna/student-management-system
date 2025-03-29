import React, { useState } from 'react';
import Slidebar from '../Components/Slidebar/Slidebar';
import Slidebarheader from '../Components/Header/Slidebarheader';
import TotalCourses from '../Components/Totalcount/TotalCourses';

function Dashboard() {

  return (
    <>
      <Slidebar />
      <Slidebarheader heading="Dashboard" />
      <div className="pt-20 ml-64 z-3 ">
        <div className="mb-15">
          <h1 className="relative ml-10 mt-10 font-bold text-[19px] sm:text-[20px] md:text-[23px]">
            Overview
          </h1>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-5">
          <div className="relative ml-10 bg-gray-300 w-60 h-30 flex justify-center rounded-xl">
            <h1 className="mt-5 font-bold text-sm sm:text-lg md:text-[18px] ">Student</h1>
          </div>
          <div className="relative ml-10 bg-gray-300 w-60 h-30 flex flex-col items-center justify-center rounded-xl text-center">
            <h1 className="font-bold text-sm sm:text-lg md:text-[18px]">Courses</h1>
            <TotalCourses/>
          </div>
  
        </div>
      
      </div>
    </>
  );
}

export default Dashboard;
