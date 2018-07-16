import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./Modal.css";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const Modal = (props)=> (
  <div id="myModal" className= {props.modal || "modal"}>
    <div className="modal-content">
      <div>
        {props.children} 
      </div>
      <span className="close" >
        <Button variant="fab" mini color="secondary" aria-label="add" className={props.classes.button} onClick={props.onClick}>
          X
        </Button>
      </span>
    </div>
  </div>
);

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Modal);