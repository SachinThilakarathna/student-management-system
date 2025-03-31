import React from 'react'
import {Link} from 'react-router-dom';

function Menulink(props) {
  return (
    <div className="list1">
      {/* <a href={props.url} className="hover:text-[#c3c0c0]/50">{props.linkname}</a> */}
      <Link to={props.url} className={`hover:text-[#c3c0c0]/50 ${props.className1}`}>{props.linkname}</Link>
    </div>
  )
}

export default Menulink
