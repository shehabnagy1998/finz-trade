import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const CustomScrollbars = ({ id, ...props }) => (
  <Scrollbars
    {...props}
    autoHide
    renderView={(props) => <div {...props} id={id} className="view" />}
    renderTrackHorizontal={(props) => (
      <div
        {...props}
        style={{ display: "none" }}
        className="track-horizontal"
      />
    )}
  />
);

export default CustomScrollbars;
