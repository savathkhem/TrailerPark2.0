import React from "react";
import "./ProfileWrapper.css";

const ProfileWrapper = (props) => (
  <div className="container">
    {props.children}
  </div>
);

export default ProfileWrapper;
