import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Typography,
  Menu,
  IconButton,
  Avatar
} from "@material-ui/core/";
import Logo from "../Logo";
import firebase from "../../firebaseConfig";
import DrawerLeft from "../DrawerLeft";
import ModalNew from "../ModalNew";
import Login from "../Login";
import LoginMenu from '../LoginMenu'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "fixed",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  avatarButton: {
    height: "inherit",
    marginLeft: 12,
    marginRight: 20,
    float: "right"
  },
  hide: {
    display: "none"
  },
});

class NavBar extends React.Component {
  state = {
    open: false,
    anchor: "left",
    auth: true,
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
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

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    });
  };

  logOut = () =>
    firebase
      .auth()
      .signOut()
      .then(success => {
        // Sign-out successful.
        console.log("User signed out");
      })
      .catch(error => {
        // An error happened
        console.log(error);
      });

  render() {
    const { classes } = this.props;
    const { anchor, open } = this.state;
    const { auth, anchorEl } = this.state;
    const openlogin = Boolean(anchorEl);
    
    //saves currentPage for App Bar title
    const currentPage = ()=> {
      let current = window.location.pathname;
      if (current === "/in-theaters") {
        return "In Theaters"
      }
      else if (current === "/search") {
        return "Results"
      }
      else if (current === "/top-movies") {
        return "Top Movies"
      }
      else if (current === "/top-tv") {
        return "Top TV Shows"
      }
      else if (current === "/upcoming") {
        return "Upcoming Movies"
      }
      else if (current === "/favorites") {
        return "Favorites"
      }
    };

    //Saves user for conditional rendering of login/logout functions
    const user = this.props.name;
    let loginToggle;

    if (user === "Not Logged In") {
      loginToggle = (
          // <MenuItem
          //   onClick={this.handleModalClick}
          //   onClose={this.handleModalClick}
          // >
          //   Log In
          // </MenuItem>
          <LoginMenu />
      );
    } else {
      // loginToggle = <MenuItem onClick={this.logOut}>Log Out</MenuItem>;
      loginToggle= <Fragment>
      <IconButton
        className={classes.avatarButton}
        aria-owns={openlogin ? "menu-appbar" : null}
        aria-haspopup="true"
        onClick={this.handleMenu}
        color="inherit"
      >
        <Avatar
          alt={this.props.name}
          className={(classes.avatar, classes.bigAvatar)}
        >
          <img className={classes.bigAvatar} src={this.props.src} alt={this.props.name} />
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={openlogin}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.handleClose}>
          <Link to="/">
            {this.props.name}
            's Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={this.handleClose}>Settings</MenuItem>
        <MenuItem onClick={this.logOut}>Log Out</MenuItem>;
      </Menu>
    </Fragment>
    }

    return (
      <div>
        <ModalNew
         open={this.state.modalOpen}
         onClose={this.handleModalClick}
        >
          <Login onClick={this.handleModalClick}/>

        </ModalNew>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes[`appBarShift-${anchor}`]]: open
          })}
          style={{ backgroundColor: "#424242" }}
        >
          <Toolbar disableGutters={!open}>

            {/* Drawer For Menu Items */}
            <DrawerLeft
              onChange={this.props.onChange}
              handleSubmit={this.props.handleSubmit}
            />

            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <Logo />
              {currentPage()}
            </Typography>
            {auth && (
              <Fragment>
              {loginToggle}
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(NavBar);
