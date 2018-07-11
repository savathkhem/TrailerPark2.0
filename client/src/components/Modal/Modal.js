import React from "react";
import Button from '@material-ui/core/Button';
import "./Modal.css";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const Modal = (props, classes)=> (
  <div id="myModal" className= {props.modal || "modal"}>
      <div className="modal-content">
        <div>
        {props.children} 
        </div>
        <span className="close" >
            <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button} onClick={props.onClick}>
              X
            </Button>
        </span>
        <div>
        {props.children}
        </div>
      </div>
  </div>
);

export default Modal; 