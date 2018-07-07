import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, MenuItem, Typography, Menu, IconButton, Avatar } from '@material-ui/core/';
import { AccountCircle } from '@material-ui/icons/';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PageOptions from './../../tileData';
import Logo from "../../Logo";
import firebase, { auth, provider } from "../../../firebaseConfig";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
    flex: {
    flex: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'relative',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  avatarButton: {
    height: 'inherit',
    marginLeft: 12,
    marginRight: 20,
    float: 'right',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    float: 'right',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    // position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class PersistentDrawer extends React.Component {
  state = {
    open: false,
    anchor: 'left',
    auth: true,
    anchorEl: null,
  };
  
  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  logOut = ()=> firebase.auth().signOut()
  .then((success)=> {
    // Sign-out successful.
    console.log("User signed out")
  })
  .catch((error)=> {
    // An error happened
    console.log(error)
  });

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;
    const { auth, anchorEl } = this.state;
    const openlogin = Boolean(anchorEl);

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List><PageOptions onChange={this.props.onChange} handleSubmit={this.props.handleSubmit}/></List>
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes[`appBarShift-${anchor}`]]: open,
          })}
          style={{backgroundColor: "#424242"}}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
            <Logo />
            </Typography>
            {auth && (
              <div>
                <IconButton
                  className={classes.avatarButton}
                  aria-owns={openlogin ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                {/* <h4>{this.props.name}</h4> */}
                <Avatar alt={this.props.name} className={(classes.avatar, classes.bigAvatar)}><img className={classes.bigAvatar} src={this.props.src} alt={this.props.alt}/></Avatar>
                  {/* <AccountCircle/> */}
                </IconButton>
                {/* <Avatar><img src={this.props.src} alt={this.props.alt}/></Avatar> */}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openlogin}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>{this.props.name}'s Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                  <MenuItem onClick={this.logOut}>Logout</MenuItem>

                </Menu>
            </div>)}
          </Toolbar>
        </AppBar>
          {before}

          {/* <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <MainContent/>
          </main> */}


          
          {after}
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);