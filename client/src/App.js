import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import CardWrapper from "./components/CardWrapper";
import API from "./utils/API";
import Modal from "./components/Modal";
import iFrame from "./components/iFrame";
import AppBar from "./components/AppBar";
import "./App.css"

class App extends Component {

  render() {
    return (
      <Router>
        <div>
        <CssBaseline />
          <AppBar />
          <Route exact path="/" component={Home}/>
        </div>
      </Router>
    )
  }
}

export default App;
