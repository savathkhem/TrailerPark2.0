import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Menu,MenuItem,ListItem,ListItemIcon,ListItemText,Typography,IconButton,Button,TextField } from '@material-ui/core/';
import firebase from "../../firebaseConfig";
import withFirebaseAuth from "react-auth-firebase";

const styles = theme => ({
  menuIcon: {
    color: '#FF1177',
    fontSize: 'xx-large',
  },
  buttonIcon: {
    color: '#FF1177',
    fontSize: 'large',
  },
});

class LoginMenu extends React.Component {
  state = {
    anchorEl: null,
    anchorLog: null,
    email: ``,
    password: ``,
    loading: true, authenticated: false, user: null,
    open: false,
    openSignUp: false,
    auth: true,
    anchorElSignUp: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }
  handleMenu = event => {
    this.setState({ anchorLog: event.currentTarget });
  };

  // Menu Button Functions //
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  // Menu Button Functions End//



  // Login Functions //
  handleMenuSignUp = event => {
    this.setState({ anchorElSignUp: event.currentTarget });
  };

  handleCloseSignUp = () => {
    this.setState({ anchorElSignUp: null });
  };
  // Login Functions End



  render() {
    const { classes } = this.props
    const {
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signInWithFacebook,
      signInWithGithub,
      signInWithTwitter,
      // googleAccessToken,
      // facebookAccessToken,
      // githubAccessToken,
      // twitterAccessToken,
      // twitterSecret,
      user,
      // error,
      // signOut
    } = this.props;
    const { email, password } = this.state;
    // const {loading } = this.state;

    const { loading } = this.state;
    const { anchorEl, anchorElSignUp } = this.state;
    const openlogin = Boolean(anchorEl);
    const openSignUp = Boolean(anchorElSignUp);

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.buttonIcon}
        >
          Login
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >

          {/* Google Login */}
          <MenuItem onClick={this.handleClose}>
          <ListItem button onClick={signInWithGoogle}>
            <ListItemIcon className={classes.menuIcon}>
              <i className="fab fa-google"></i>
            </ListItemIcon>
            <ListItemText>
              <Typography className={classes.menuText}>
                Sign In With Google
              </Typography>
            </ListItemText>
          </ListItem>
          </MenuItem>
          {/* End Google Login */}

          {/* FaceBook Login */}
          <MenuItem onClick={this.handleClose}>
          <ListItem button onClick={signInWithFacebook}>
            <ListItemIcon className={classes.menuIcon}>
              <i className="fab fa-facebook"></i>
            </ListItemIcon>
            <ListItemText>
            <Typography className={classes.menuText}>
                Sign In With FaceBook
              </Typography>
            </ListItemText>
          </ListItem>
          </MenuItem>
          {/* End FaceBook Login */}

          {/* GitHub Login */}
          <MenuItem onClick={this.handleClose}>
          <ListItem button onClick={signInWithGithub}>
            <ListItemIcon className={classes.menuIcon}>
              <i className="fab fa-github-square"></i>
            </ListItemIcon>
            <ListItemText>
            <Typography className={classes.menuText}>
                Sign In With GitHub
              </Typography>
            </ListItemText>
          </ListItem>
          </MenuItem>
          {/* End Github Login */}

          {/* Twitter Login */}
          <MenuItem onClick={this.handleClose}>
          <ListItem button onClick={signInWithTwitter}>
            <ListItemIcon className={classes.menuIcon}>
              <i className="fab fa-twitter-square"></i>
            </ListItemIcon>
            <ListItemText >
            <Typography className={classes.menuText}>
                Sign In With Twitter
              </Typography>
            </ListItemText>
          </ListItem>
          </MenuItem>
          {/* End Twitter Login */}
        </Menu>
      </div>
    );
  }
}

const authConfig = {
  email: {
    verifyOnSignup: false,
    saveUserInDatabase: true
  },
  google: {
    // scopes: ["admin.datatransfer", "contacts.readonly"], // optional
    // customParams: {
    //   login_hint: "user@example.com"
    // },
    // redirect: true, // default is popup: true, redirect: true,
    returnAccessToken: true,
    // scopes: [], // array
    saveUserInDatabase: true
  },
  facebook: {
    // scopes: ["admin.datatransfer", "contacts.readonly"], // optional
    // customParams: {
    //   login_hint: "user@example.com"
    // },
    redirect: true, // default is popup: true, redirect: true,
    returnAccessToken: true,
    saveUserInDatabase: true
  },
  github: {
    // redirect: true,
    returnAccessToken: true,
    saveUserInDatabase: true
  },

  twitter: {
    // redirect: true,
    returnAccessToken: true,
    returnSecret: true,
    saveUserInDatabase: true
  }
};

LoginMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

//Export using multiple function
export default withStyles(styles)(withFirebaseAuth(LoginMenu, firebase, authConfig));