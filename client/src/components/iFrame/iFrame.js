import React from "react";
import "./iFrame.css"

const iFrame = (props) => 
<div>
<iframe id="ytplayer" type="text/html" src={props.src} title={props.title}></iframe>
</div>


export default iFrame;