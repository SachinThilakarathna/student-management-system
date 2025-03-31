import React from 'react'
import Menulink from '../Link/Menulink'
function Header() {
  return (

    <>
        <div className="fixed top-0 left-0 w-full flex justify-between items-center px-[50px] py-[10px] bg-[radial-gradient(circle,_#9f06c9,_#340138)]">
            <img src="akura-logo.png" alt="logo" className='h-20 pt-5 pb-5'/>
        
        <div className='relative  flex gap-12 text-[#d6d6d6] font-semibold '>
            <Menulink linkname="Home" url="/"/>
            <Menulink linkname="About" url="/about"/>
            <Menulink linkname="Login" url="/login" className1="text-[#F6941F] font-extrabold"/>
        </div>
        </div>
        

 
    </>
  )
}

export default Header
