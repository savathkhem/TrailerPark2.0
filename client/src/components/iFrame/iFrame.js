import React from "react";
import "./iFrame.css"

const iFrame = (props) => <iframe id="ytplayer" type="text/html" src={props.src} title={props.title}></iframe>


export default iFrame;