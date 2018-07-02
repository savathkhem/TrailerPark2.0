import React from "react";
import "./Modal.css";

const Modal = (props)=> (
  <div id="myModal" className= {props.modal || "modal"} onClick={props.onClick}>
      <div className="modal-content">
        <span className="close" >&times;</span>
        <div>
        {props.children}
        </div>
      </div>
  </div>
);

export default Modal; 