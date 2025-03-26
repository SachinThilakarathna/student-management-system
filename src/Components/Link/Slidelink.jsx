import React from "react";
import { NavLink } from "react-router-dom";

function Slidelink(props) {
  return (
    <div>
      <NavLink
        to={props.linkurl}
        className={({ isActive }) =>
          `transition duration-300 ${
            isActive ? "text-[#F6941F] font-bold" : "text-gray-100"
          } hover:text-[#F6941F]`
        }
      >
        {props.linkname}
      </NavLink>
      {props.children}
    </div>
  );
}

function Slidelink2(props) {
  return (
    <div>
      <NavLink
        to={props.linkurl2}
        className={({ isActive }) =>
          `transition duration-300 ${
            isActive ? "text-[#F6941F] font-bold" : "text-gray-300"
          } hover:text-[#F6941F]`
        }
      >
        {props.linkname2}
      </NavLink>
      {props.children}
    </div>
  );
}

export { Slidelink, Slidelink2 };
