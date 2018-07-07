import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, List, IconButton, Button, Divider} from '@material-ui/core/';

// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import PageOptions from './../tileData';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';


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
      <List><PageOptions onChange={this.props.onChange} handleSubmit={this.props.handleSubmit}/></List>
      </div>
    );

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)}><MenuIcon /></IconButton>
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