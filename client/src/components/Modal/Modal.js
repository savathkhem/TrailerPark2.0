import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "./Modal.css";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const Modal = (props)=> (
  <div id="myModal" className= {props.modal || "modal"} onClick={props.onClick}>
    <div className="modal-content">
      <div>
        {props.children} 
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Modal);