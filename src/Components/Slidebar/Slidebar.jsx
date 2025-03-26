import React from 'react'
import { Slidelink, Slidelink2 } from "../Link/Slidelink.jsx";  
 // I import 2 functions use in same comonent
 import { IoIosSettings } from "react-icons/io";
 import { RiLogoutBoxRLine } from "react-icons/ri";

import { useState } from "react";

function Slidebar() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
        <div>
            <div className='absolute min-w-screen bg-[radial-gradient(circle,_#9f06c9,_#340138)] h-20'> ajkjkj</div>
            
        </div>
        <div className="relative items-center px-[50px] py-[10px] bg-[radial-gradient(circle,_#9f06c9,_#340138)] w-64 min-h-screen h-auto space-y-10">
        <img src="akura-logo.png" alt="logo" className='h-20 pt-5 pb-5'/>
         
        <div className='relative  font-semibold space-y-4'>
                <Slidelink linkname='Dashboard' linkurl='/dashboard'/>
                <Slidelink linkname='Course' linkurl='/course'/>

                <div className='flex'>
                    <button onClick={() => setIsVisible(!isVisible)}
                    className="text-gray-100 hover:text-[#F6941F]">Manage Student</button>
                    <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[5px] border-t-gray-100 mt-2.5 ml-4 hover:border-t-[#F6941F]"></div>

                    {/* <img src="dropdownarrow-icon.png" alt="logout" className='h-5 pl-8 mt-1'/> */}
                </div>


                <div className={`${isVisible ? "block" : "hidden"}  pl-4 space-y-4`}>
                    <Slidelink2 linkname2='Add Student' linkurl2='/addstudent'/>
                    <Slidelink2 linkname2='Remove Student' linkurl2='/removestudent'/>
                    <Slidelink2 linkname2='View Student List' linkurl2='/viewstudentlist'/>
                    <Slidelink2 linkname2='View Student Details' linkurl2='/viewstudentdetails'/>
                </div>
                <Slidelink linkname='Audit Logs' linkurl='/auditlogs'/>


        </div>




            {/* Bottom part of the slid bar */}
        <div className="absolute bottom-10  text-[#d6d6d6] font-semibold space-y-4">
            <div className='flex'>
                {/* <img src="setting.png" alt="setting" className='h-5 pr-2 mt-1'/> */}
                <IoIosSettings className=' mt-1 mr-2 w-5 h-5'/>
                <Slidelink linkname='Settings' linkurl='/settings'/>
            </div>
            <div className='flex hover:text-[#F6941F]'>
                    {/* <img src="logout.png" alt="logout" className='h-5 pr-2 mt-1'/> */}
                    <RiLogoutBoxRLine className=' mt-1 mr-2 w-5 h-5 text-[#d6d6d6] hover:text-[#F6941F]'/>
                    <Slidelink linkname='Log out' linkurl='/logout'></Slidelink>
            </div>
            </div>

        </div>    
      
    </>
  )
}

export default Slidebar
