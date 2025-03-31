import React from 'react'
import Slidebar from '../../Components/Slidebar/Slidebar'
import Slidebarheader from '../../Components/Header/Slidebarheader'
import AddStudentForm from '../../Components/Student/Addstudentform'


function Addstudent() {
  return (
    <>
    <Slidebar/>
    <Slidebarheader heading="Manage Student / Add Student"/>
    <div className="pt-30 ml-64 z-10  h-screen">
        <AddStudentForm/> 
    </div>
    
      
    </>
  )
}

export default Addstudent

