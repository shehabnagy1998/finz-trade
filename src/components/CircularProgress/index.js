import React from "react";
import loader from "../../assets/images/loader.svg";

const CircularProgress = ({ className }) => (
  <div id="loader-wrapper">
    <div id="loader"></div>
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>
  </div>
);
export default CircularProgress;
