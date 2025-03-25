import React from 'react'
import './Slidebar';
import Slidelink from '../Link/Slidelink';


function Slidebar() {
  return (
    <>
            <div className="relative items-center px-[50px] py-[10px] bg-[radial-gradient(circle,_#9f06c9,_#340138)] w-64 min-h-screen h-auto space-y-10">
            <img src="akura-logo.png" alt="logo" className='h-20 pt-5 pb-5'/>
         
            <div className='relative text-[#d6d6d6] font-semibold space-y-4'>
                <Slidelink linkname='Dashboard' linkurl='/dashboard'/>
                <Slidelink linkname='Course' linkurl='/course'/>
                <Slidelink linkname='Manage Student' linkurl='/managestudent'/>
            </div>
            <div className="absolute bottom-10  text-[#d6d6d6] font-semibold space-y-4">
                <div className='flex'>
                    <img src="setting.png" alt="setting" className='h-5 pr-2 mt-1'/>
                    <Slidelink linkname='Settings' linkurl='/settings'/>
                </div>
                <div className='flex'>
                    <img src="logout.png" alt="logout" className='h-5 pr-2 mt-1'/>
                    <Slidelink linkname='Log out' linkurl='/logout'></Slidelink>
                </div>
            </div>

        </div>    
      
    </>
  )
}

export default Slidebar
