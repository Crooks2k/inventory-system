import React from "react";
import "./Skeleton.css";

const Skeleton = ({ width, height, marginTop, marginBottom, ms, me, bgc}) => {
  const style = {
    width: width || "100px",
    height: height || "10px",
    marginTop: marginTop || "0",
    marginBottom: marginBottom || "0",
    marginRight: me || "0",
    marginLeft: ms || "0",
    backgroundColor: bgc || "lightgray",
    animation: "loading 1.5s infinite",
  };

  return <div style={style} className="mb-2"></div>;
};

export default Skeleton;
