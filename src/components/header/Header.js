import React from "react";
import "./Header.css";

/**
 * Header component for the image processing software.
 * This component displays the software title.
 * @returns {JSX.Element} Header component JSX
 */
function Header() {
  return (
    <nav className="nav">
      {/* Displaying the software title */}
      <h1 className="software-title">Pixel Manipulator</h1>
    </nav>
  );
}

export default Header;
