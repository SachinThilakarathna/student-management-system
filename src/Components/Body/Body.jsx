import React from 'react'

function Body(props) {
  return (
    <div>
      <h1 className='font-bold pt-10 text-center h-30'>{props.bodyname}</h1>
      {props.children}
    </div>
  )
}

export default Body
