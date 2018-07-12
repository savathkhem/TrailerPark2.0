import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect, BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AppBar } from "./components/Layout";
import Login from "./components/Login";
import { Home, TopTV, InTheaters, Upcoming, TopMovie, } from "./pages/";
import API from "./utils/API";
import "./App.css";
import firebase, { auth, provider } from "./firebaseConfig";
import withFirebaseAuth from "react-auth-firebase";
import Search from "./pages/Search";

const tmdbImgUrl = 'https://image.tmdb.org/t/p/w185';

class App extends Component {
  state = {
    loading: true, authenticated: false, user: null,
    searchRedirect: false,
    searchArr: []
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
    })
  }

  checkPosterPaths(arr) {
    let newArr = arr
    newArr.map( (movie) => {
      if (movie.poster_path === null){
        movie.poster_path = "./images/placeholder.jpg";
      }
      else{
        movie.poster_path = tmdbImgUrl + movie.poster_path;
      }
    }
    )
    arr = newArr
    return arr
  };

  componentDidUpdate() {
    if (this.state.searchRedirect===true) {
      this.setState({searchRedirect: false})
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    API.getSearch(this.state.search)
      .then((res) => {
        console.log(res);
        this.checkPosterPaths(res.data)
        return res;
      })
      .then(res => this.setState({ searchArr: res.data }))
      // .then(res => this.checkPosterPaths())
      .then(this.setState({searchRedirect: true}))
      .catch(err => console.log(err));
  }
    
  render() {
    if (this.state.currentUser) {
      return (
        <Router>
          <div>
            <CssBaseline />
            <AppBar 
              src={this.state.currentUser.photoURL}
              alt={this.state.currentUser.displayName} 
              name={this.state.currentUser.displayName}
              onChange={this.handleInputChange}
              handleSubmit={this.handleFormSubmit}
            />
            {this.state.searchRedirect && <Redirect push to="/search"/>}
            <Route exact path="/login" component={Login} />
            <Route exact path="/" render={()=><Home userName={this.state.currentUser.displayName}/>}/>
            <Route exact path="/in-theaters" render={()=><InTheaters userName={this.state.currentUser.displayName}/>}/>
            <Route exact path="/top-tv" render={()=><TopTV userName={this.state.currentUser.displayName}/>}/>
            <Route exact path="/upcoming" render={()=><Upcoming userName={this.state.currentUser.displayName}/>}/>
            <Route exact path="/top-movies" render={()=><TopMovie userName={this.state.currentUser.displayName}/>}/> />
            <Route exact path="/search" render={()=><Search movies={this.state.searchArr} userName={this.state.currentUser.displayName}/>}/>
          </div>
        </Router>
      )
    }
    else {
      return (
        <Router>
          <Login />
        </Router>
      )
    }
  }
}


// export default App;
export default App;
