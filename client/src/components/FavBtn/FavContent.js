import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Snackbar } from '@material-ui/core/';

const styles = theme => ({
  snackbar: {
    position: 'relative',
    width:'100%',
  },
  snackbarContent: {
    width: '100%',
    minWidth: 'unset',
  },
});


const FavContent = (props) =>  (

      <Fragment 
      >
        <Snackbar
          open={props.open}
          autoHideDuration={3000}
          onClose={props.onClose}

          ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id',
            className: props.classes.snackbarContent,
          }}
          message={
            <span id="snackbar-fab-message-id">Fav Added!</span>}
          action={
            <Button color="inherit" size="small" onClick={props.onClose}>
              Undo
            </Button>
          }
          className={props.classes.snackbar}
        />
      </Fragment>
    );


FavContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FavContent);