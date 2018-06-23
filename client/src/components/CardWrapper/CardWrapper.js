import React from "react";
import "./CardWrapper.css";

const CardWrapper = (props) => (
<div className="videos-display">
        {props.children}
</div>
);

export default CardWrapper;
