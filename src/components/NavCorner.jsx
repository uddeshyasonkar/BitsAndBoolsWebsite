import React from "react";

const NavCorner = ({ position, label }) => {
  return (
    <div className={`nav-corner ${position}`}>
      <button>{label}</button>
    </div>
  );
};

export default NavCorner;
