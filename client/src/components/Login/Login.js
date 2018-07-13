import React, { Component } from "react";
// import DrawerLeft from "./components/DrawerLeft";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import firebase from "../../firebaseConfig";
import withFirebaseAuth from "react-auth-firebase";
import Logo from "../Logo";
import "./Login.css";
import Button from '@material-ui/core/Button';

class Login extends Component {
  state = {
    email: ``,
    password: ``,
    loading: true, authenticated: false, user: null,
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

  render() {
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
    const {loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
      <div className="login">
        <Logo />
        <br />
        <Paper style={{ width: 700, marginLeft: 'auto', marginRight: 'auto' }} elevation={2}>
          <br />
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
            <br /><br />
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
          <br /><br />
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
            <br /><br />
            <Button
              type="submit"
              variant="contained"
              onClick={() => signUpWithEmail(email, password)}
            >
              Sign Up
            </Button>
          </form>
          <br /><br />
          <Button variant="contained" onClick={signInWithGoogle}>Sign in with Google &nbsp;<i className="fab fa-google"></i></Button><br /><br />
          <Button variant="contained" onClick={signInWithFacebook}>Sign in with Facebook &nbsp;<i className="fab fa-facebook"></i></Button>{" "}<br /><br />
          <Button variant="contained" onClick={signInWithGithub}>Sign in with Github &nbsp;<i className="fab fa-github-square"></i></Button><br /><br />
          <Button variant="contained" onClick={signInWithTwitter}>Sign in with Twitter &nbsp;<i className="fab fa-twitter-square"></i></Button><br /><br />
        </Paper>
        <br />
      </div>
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

export default withFirebaseAuth(Login, firebase, authConfig);
