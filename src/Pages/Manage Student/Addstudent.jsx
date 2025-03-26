import React from 'react'
import Slidebar from '../../Components/Slidebar/Slidebar'
import Slidebarheader from '../../Components/Header/Slidebarheader'
import AddStudentForm from '../../Components/Addstudentform'


function Addstudent() {
  return (
    <>
    <Slidebar/>
    <Slidebarheader heading="Manage Student / Add Student"/>
    <div className="pt-25 ml-64 z-10">
        <AddStudentForm/> 
    </div>
    
      
    </>
  )
}

export default Addstudent

