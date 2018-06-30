import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core/';
import "./Modal.css";

const Modal = (props)=> (
  <div id="myModal" className= {props.modal || "modal"} onClick={props.onClick}>
    {/* <Paper>     */}
      <div className="modal-content">
        <span className="close" >&times;</span>
        {props.children}
      </div>
    {/* </Paper> */}
  </div>
);

export default Modal; 