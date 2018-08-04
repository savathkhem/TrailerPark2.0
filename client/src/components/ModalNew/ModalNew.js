import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core/';


const styles = theme => ({
  child: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '@media screen and (max-width: 900px)': {
      width: '90vw',
    },
  },
  modal: {
    position: 'absolute',
    height: 'fit-content',
    '@media screen and (max-width: 900px)': {
      width: '100vw',
      left: '50%',
      transform: 'translate(-50%)',
    }
  },
  BackdropProps: {
		height: '100vh'
	},
});

const ModalNew = (props) =>  (

  <Fragment>
    <Modal
      BackdropProps={{className: props.classes.BackdropProps}}
      className={props.classes.modal}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div 
      className={props.classes.child}
      >
        {props.children}
      </div>
    </Modal>
  </Fragment>
);

ModalNew.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalNew);