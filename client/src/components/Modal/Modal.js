import React from "react";
import "./Modal.css";

const Modal = (props)=> (
    <div id="myModal" className= {props.modal || "modal"} onClick={props.onClick}>
      <div className="modal-content">
        <span className="close" >&times;</span>
        {props.children}
      </div>
    
    </div>
);

export default Modal; 