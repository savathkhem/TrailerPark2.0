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
      <span className="close" onClick={props.onClick}>
          {/* &times; */}
            <Button variant="fab" color="secondary" aria-label="add" className={classes.button} >
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