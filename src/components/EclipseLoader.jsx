import React from "react";

const EclipseLoader = ({ active }) => {
  return <div className={`eclipse-loader ${active ? "spin" : ""}`}></div>;
};

export default EclipseLoader;
