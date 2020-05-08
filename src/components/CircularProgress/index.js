import React from "react";
import loader from "../../assets/images/loader.svg";

const CircularProgress = ({ className }) => (
  <div className="main-loader-container">
    <div className={`loader ${className}`}>
      <img src={loader} alt="loader" />
    </div>
  </div>
);
export default CircularProgress;
