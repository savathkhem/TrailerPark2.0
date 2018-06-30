import React from "react";
import "./CardWrapper.css";

const CardWrapper = (props) => (
  <div className="poster-container">
    {props.children}
  </div>
);

export default CardWrapper;
