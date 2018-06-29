import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppBar } from "./components/Layout";
// import DrawerLeft from "./components/DrawerLeft";
import { Home, TopTV, InTheaters, Upcoming, TopMovie, AllNetflix } from "./Pages/";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <CssBaseline />
          <AppBar />
          {/* <DrawerLeft /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/in-theaters" component={InTheaters} />
          <Route exact path="/top-tv" component={TopTV} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/top-movies" component={TopMovie} />
          <Route exact path="/all-netflix" component={AllNetflix} />
        </div>
      </Router>
    )
  }
}

export default App;