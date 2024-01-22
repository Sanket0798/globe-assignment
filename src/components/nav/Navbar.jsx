import React from "react";
import "./navbar.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import travelo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <>
      <nav>
        <img src={travelo} alt="Travelo" className="logo" />
        <ul>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Sign up</a>
          </li>
          <li className="search">
            <FaMagnifyingGlass />
          </li>
          <li className="hamburger">
            <a href="#">
              <div className="bar" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
