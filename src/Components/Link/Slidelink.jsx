import React from 'react'
import {Link} from 'react-router-dom';

function Slidelink(props) {
  return (
    <div>
      <Link to={props.linkurl} className="text-gray-100 hover:text-[#F6941F]">{props.linkname}</Link>
      {props.children}
    </div>
  )
}

function Slidelink2(props) {
  return (
    <div>
      <Link to={props.linkurl2} className=' hover:text-[#F6941F] transition duration-300 text-gray-300'>{props.linkname2}</Link>
      {props.children}
    </div>
  )
}

export { Slidelink, Slidelink2 };
