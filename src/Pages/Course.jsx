import React, { useState } from 'react';
import Slidebar from '../Components/Slidebar/Slidebar';
import Slidebarheader from '../Components/Header/Slidebarheader';
import Addcourse from '../Components/Course/Addcourse';
import Viewcourse from '../Components/Course/Viewcourse';

function Course() {


  return (
    <>
      <Slidebar />
      <Slidebarheader heading="Add Course" />
      <div className="pt-25 ml-64 z-10">
      <Addcourse/>
      <Viewcourse/>
      </div>

    </>
  );
}

export default Course;
