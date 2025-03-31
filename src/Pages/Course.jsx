import React, { useState } from 'react';
import Slidebar from '../Components/Slidebar/Slidebar';
import Slidebarheader from '../Components/Header/Slidebarheader';
import Addcourse from '../Components/Course/Addcourse';
import Viewcourse from '../Components/Course/Viewcourse';

function Course() {


  return (
    <>
      <Slidebar />
      <Slidebarheader heading="Course" />
      <div className="pt-30 ml-64 z-10 h-screen">
      <Addcourse/>
      <Viewcourse/>
      </div>

    </>
  );
}

export default Course;
