import React, { useState } from 'react';
import Slidebar from '../Components/Slidebar/Slidebar';
import Slidebarheader from '../Components/Header/Slidebarheader';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the styles

function Afterlogin() {

  return (
    <>
      <Slidebar />
      <Slidebarheader heading="Dashboard" />
      <div className="pt-20 ml-64 z-10 bg-blue-100">
        <div className="mb-20">
          <h1 className="relative ml-10 mt-10 font-bold">
            Welcome to Student Management System
          </h1>
        </div>

        <div className="flex">
          <div className="relative ml-20 bg-gray-300 w-60 h-30 flex justify-center rounded-xl">
            <h1 className="mt-5 font-bold">Student</h1>
          </div>
          <div className="relative ml-20 bg-gray-300 w-60 h-30 flex justify-center rounded-xl">
            <h1 className="mt-5 font-bold">Courses</h1>
          </div>
  
        </div>
      
      </div>
    </>
  );
}

export default Afterlogin;
