import React, { Component, Fragment } from "react";
// import DrawerLeft from "./components/DrawerLeft";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Typography, TextField, ListItem, ListItemText, ListItemIcon, Button, IconButton, Menu } from '@material-ui/core/';
import firebase from "../../firebaseConfig";
import withFirebaseAuth from "react-auth-firebase";
import Logo from "../Logo";
import "./Login.css";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 100,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 'inherit',
    backgroundColor: '#424242',
  },
  buttonRight: {
    float: 'right',
    margin:10,
    minWidth: 90
  },
  button: {
    margin: 10,
    minWidth: 90
  },
  menuIcon: {
    color: '#FF1177',
    fontSize: 'xx-large',
  },
  menuText: {
    color: '#fafafa',
  },
  logo2: {
    textAlign: 'center',
  }
});

class Login extends Component {
  state = {
    email: ``,
    password: ``,
    loading: true, authenticated: false, user: null,
    open: false,
    openSignUp: false,
    anchor: 'left',
    auth: true,
    anchorEl: null,
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
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  handleMenuSignUp = event => {
    this.setState({ anchorElSignUp: event.currentTarget });
  };

  handleCloseSignUp = () => {
    this.setState({ anchorElSignUp: null });
  };

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
      <Fragment>
        <Paper className={classes.root} elevation={24}>
        <Typography variant="headline" component="h3"  className={classes.logo2}>
          <Logo/>
        </Typography>
 
          <IconButton
            className={
              classes.button
            }
            aria-owns={openlogin ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <Button variant="contained">
              Sign In
            </Button>
          </IconButton>
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
          <form onSubmit={e => e.preventDefault()}>
            <h2> Sign In! </h2>
            <TextField
              id="email"
              label="Email"
              onChange={e => this.setState({ email: e.target.value })}
              // margin="normal"
            />{"  "}
            <TextField
              id="password"
              label="Password"
              onChange={e => this.setState({ password: e.target.value })}
              // margin="normal"
            />
            {!user && (
              <Button
                type="submit"
                variant="contained"
                onClick={() => signInWithEmail(email, password)}
              >
                Sign In
              </Button>
            )}
          </form>
          </Menu>

          <IconButton
            className={
              classes.buttonRight
              // classes.button
            }
            aria-owns={openlogin ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenuSignUp}
            color="inherit"
          >
            <Button variant="contained">
              Sign Up
            </Button>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElSignUp}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openSignUp}
            onClose={this.handleCloseSignUp}
          >
          <form onSubmit={e => e.preventDefault()}>
            <h2> Sign Up! </h2>
            <TextField
              id="email"
              label="Email"
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
              value={email}
              // margin="normal"
            />{" "}
            <TextField
              id="password"
              label="Password"
              onChange={e => this.setState({ password: e.target.value })}
              value={password}
              // margin="normal"
            />{" "}
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              onClick={() => signUpWithEmail(email, password)}
            >
              Sign Up
            </Button>
          </form>
          </Menu>

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
    
        </Paper>
      </Fragment>
    )
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

//Export using multiple function
export default withStyles(styles)(withFirebaseAuth(Login, firebase, authConfig));