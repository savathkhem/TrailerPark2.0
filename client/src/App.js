import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBar from "./components/AppBar";
// import DrawerLeft from "./components/DrawerLeft";
import Home from "./pages/Home";
import TopTV from "./pages/TopTV";
import Theaters from "./pages/InTheaters";
import Upcoming from "./pages/Upcoming";
import TopMovie from "./pages/TopMovie";
import AllNetflix from "./pages/AllNetflix";
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
          <Route exact path="/in-theaters" component={Theaters} />
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
