import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core/';


const styles = theme => ({
      avatar: {
        margin: 60,
      },
      bigAvatar: {
        width: 200,
        height: 200,
      },
});

const ProfileFrame = (props) =>  (

  <Fragment>
        <Avatar
            style={props.style}
            alt={props.alt}
            src={props.src}
            className={classNames(props.classes.avatar, props.classes.bigAvatar)}
        />
  </Fragment>
);

ProfileFrame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileFrame);