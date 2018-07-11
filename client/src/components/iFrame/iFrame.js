import React from "react";
import "./Iframe.css"

const Iframe = (props) => 
<div>
<iframe id="ytplayer" type="text/html" src={props.src} title={props.title}></iframe>
</div>


export default Iframe;