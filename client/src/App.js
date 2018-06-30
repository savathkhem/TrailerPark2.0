import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppBar } from "./components/Layout";
import Login from "./components/Login";
// import DrawerLeft from "./components/DrawerLeft";
import { Home, TopTV, InTheaters, Upcoming, TopMovie, } from "./pages/";
import "./App.css";
import firebase, { auth, provider } from "./firebaseConfig";
import withFirebaseAuth from "react-auth-firebase";


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
    if (this.state.currentUser) {
      return (
        <Router>
          <div>
            {/* <DrawerLeft /> */}
            <CssBaseline />
            <AppBar src={this.state.currentUser.photoURL} alt={this.state.currentUser.displayName} name={this.state.currentUser.displayName}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/in-theaters" component={InTheaters} />
            <Route exact path="/top-tv" component={TopTV} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/top-movies" component={TopMovie} />
          </div>
        </Router>
      )
    }
    else {
      return <Login />;
    }
  }
}


// export default App;
export default App;
