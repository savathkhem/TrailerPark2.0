import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core/';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 'unset',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 'unset',
  },
});

const ModalNew = (props) =>  (

  <Fragment>
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={getModalStyle()} className={props.classes.paper}>
        {props.children}
      </div>
    </Modal>
  </Fragment>
);

ModalNew.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalNew);