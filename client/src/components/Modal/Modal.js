import React from "react";
import "./Modal.css";

const Modal = (props)=> (
    <div id="myModal" className= {props.modal || "modal"}>
      <div className="modal-content">
        <span className="close" onClick={props.onClick}>&times;</span>
        <p>YouTubes will go here eventually!</p>
      </div>
    
    </div>
);

export default Modal; 