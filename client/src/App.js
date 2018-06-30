import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppBar } from "./components/Layout";
// import DrawerLeft from "./components/DrawerLeft";
import { Home, TopTV, InTheaters, Upcoming, TopMovie, AllNetflix } from "./pages/";
import firebase from "./firebaseConfig";
import withFirebaseAuth from "react-auth-firebase";
// import API from "utils/API";
import "./App.css";

class App extends Component {
  state = {
    email: `test@test.com`,
    password: `password`,
    loading: true, authenticated: false, user: null,
    search: "",
    movies: []
  };

  componentWillMount() {
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

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // }

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   API.getSearch(this.state.search)
  //     .then((res) => {
  //       console.log(res);
  //       return res;
  //     })
  //     .then(res => this.setState({ movies: res.data }))
  //     .catch(err => console.log(err));
  // }
    
  render() {
    const {
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signInWithFacebook,
      signInWithGithub,
      signInWithTwitter,
      googleAccessToken,
      facebookAccessToken,
      githubAccessToken,
      twitterAccessToken,
      twitterSecret,
      user,
      error,
      signOut
    } = this.props;
    const { email, password } = this.state;

    const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    // if (user) {
    //   return <Home user={user} error={error} signOut={signOut} />;
    // }

    return (
      <Router>
        <div>
          <div>
            <form onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="Email"
                onChange={e => this.setState({ email: e.target.value })}
              />{" "}
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <br />
              {!user && (
                <button
                  type="submit"
                  onClick={() => signInWithEmail(email, password)}
                >
                  SignIn
            </button>
              )}
            </form>
            <form onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="Email"
                onChange={e =>
                  this.setState({
                    email: e.target.value
                  })
                }
                value={email}
              />{" "}
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={e => this.setState({ password: e.target.value })}
                value={password}
              />{" "}
              <br />
              <button
                type="submit"
                onClick={() => signUpWithEmail(email, password)}
              >
                SignUp
          </button>
            </form>
            <br />
            <button onClick={signInWithGoogle}>Signin with Google</button> <br />
            <button onClick={signInWithFacebook}>Signin with Facebook</button>{" "}
            <br />
            <button onClick={signInWithGithub}>Signin with Github</button> <br />
            <button onClick={signInWithTwitter}>Signin with Twitter</button> <br />
          </div>
          {/* <DrawerLeft /> */}
          <CssBaseline/>
          <AppBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/in-theaters" component={InTheaters} />
          <Route exact path="/top-tv" component={TopTV} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/top-movies" component={TopMovie} />
        </div>
      </Router>
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

// export default App;
export default withFirebaseAuth(App, firebase, authConfig);
