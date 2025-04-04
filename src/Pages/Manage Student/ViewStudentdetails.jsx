import React from 'react'
import Slidebar from '../../Components/Slidebar/Slidebar'
import Slidebarheader from '../../Components/Header/Slidebarheader'
import ViewStudentList from '../../Components/Student/ViewStudentList'


function ViewStudentdetails() {
  return (
    <>
    <Slidebar/>
    <Slidebarheader heading="Manage Student / View Students Details"/>
    <div className="pt-30 ml-64 z-10 h-screen">
        <ViewStudentList/>
    </div>
    
      
    </>
  )
}

export default ViewStudentdetails

