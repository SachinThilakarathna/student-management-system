import React from 'react'

function Slidebarheader(props) {
  return (
    <>
    <div className='fixed top-0 left-0 w-full z-20'>
        <div className='relative bg-[radial-gradient(circle,_#9f06c9,_#340138)] h-20 ml-64'>
        <h1 className='pt-7 pl-10 font-normal text-gray-400'>{props.heading}</h1>
        </div>          
    </div>
      
    </>
  )
}

export default Slidebarheader
