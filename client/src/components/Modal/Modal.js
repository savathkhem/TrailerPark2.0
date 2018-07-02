import React from "react";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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
          {/* &times; */}
            <Button variant="fab" color="primary" aria-label="add" className={classes.button} onClick={props.onClick}>
              <AddIcon />
            </Button>
        </span>
      </div>
  </div>
);

export default Modal; 