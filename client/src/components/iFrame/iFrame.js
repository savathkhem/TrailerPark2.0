import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "./Iframe.css";

const styles = theme => ({
    iframe: {
        width: '100%',
        height: '80vh',
      '@media screen and (max-width: 400px)': {
        height: '50vw',
      },
    },
  });
  

const Iframe = (props) => (
    <div>
        <iframe className={props.classes.iframe} type="text/html" src={props.src} title={props.title}></iframe>
    </div>
);


Iframe.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Iframe);