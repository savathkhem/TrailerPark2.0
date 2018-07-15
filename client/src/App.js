import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect, BrowserRouter as Router, Route} from "react-router-dom";
import { AppBar } from "./components/Layout";
import Login from "./components/Login";
import Landing from "./components/Landing";
import { Home, TopTV, InTheaters, Upcoming, TopMovie } from "./pages/";
import API from "./utils/API";
import "./App.css";
import firebase from "./firebaseConfig";
import Search from "./pages/Search";

const tmdbImgUrl = 'https://image.tmdb.org/t/p/w185';

class App extends Component {
  state = {
    loading: true, authenticated: false, 
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
      let userObj = {
        name: this.state.currentUser.displayName,
        email: this.state.currentUser.email,
        user_id: this.state.currentUser.uid,
      }
      API.saveUser(userObj)
      } 
      else {
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
       return movie.poster_path = "./images/placeholder.jpg";
      }
      else{
       return movie.poster_path = tmdbImgUrl + movie.poster_path;
      }
    })
    arr = newArr;
    return arr;
  };

  componentDidUpdate() {
    if (this.state.searchRedirect===true) {
      this.setState({searchRedirect: false});
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
            <Route exact path="/" render={()=><Home user={this.state.currentUser} />}/>
            <Route exact path="/in-theaters" render={()=><InTheaters user={this.state.currentUser} />}/>
            <Route exact path="/top-tv" render={()=><TopTV user={this.state.currentUser}/>}/>
            <Route exact path="/upcoming" render={()=><Upcoming user={this.state.currentUser}/>}/>
            <Route exact path="/top-movies" render={()=><TopMovie user={this.state.currentUser}/>}/>
            <Route exact path="/search" render={()=><Search movies={this.state.searchArr} user={this.state.currentUser}/>}/>
          </div>
        </Router>
      )
    }
    else {
      return (
        <Router>
          <Landing />
        </Router>
      )
    }
  }
}

export default App;