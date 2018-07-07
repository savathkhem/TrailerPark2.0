import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, List, IconButton, Button, Divider} from '@material-ui/core/';
import PageOptions from './../tileData';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChatIcon from '@material-ui/icons/Chat'


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
      <IconButton onClick={this.toggleDrawer('left', false)}>
          <ChevronLeftIcon />
      </IconButton>
      <Divider />
      {/* <List><PageOptions onChange={this.props.onChange} handleSubmit={this.props.handleSubmit}/></List> */}
      Message Board Stuff Goes Here!
      </div>
    );

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)}><ChatIcon /></IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            // tabIndex={0}
            // role="button"
            // onClick={this.toggleDrawer('left', false)}
            // onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);