import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <hr />
          <Route exact path="/" component={Home}/>
        </div>
      </Router>
    )
  }
}

export default App;
