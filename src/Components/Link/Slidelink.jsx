import React from 'react'
import {Link} from 'react-router-dom';

function Slidelink(props) {
  return (
    <div>
      <Link to={props.linkurl} className="hover:text-[#c3c0c0]/50">{props.linkname}</Link>
      {props.children}
    </div>
  )
}

export default Slidelink
