import React from "react";
import "./CardWrapper.css";

const CardWrapper = (props) => (
  <div className="poster-container" onClick = {props.onClick}>
    {props.children}
  </div>
);

export default CardWrapper;
