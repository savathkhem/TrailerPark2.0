import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBar from "./components/AppBar";
// import DrawerLeft from "./components/DrawerLeft";
import Home from "./pages/Home";
import "./App.css"

class App extends Component {

  render() {
    const path = <Route exact path="/" component={Home}/>;
    return (
      <Router>
        <div>
        <CssBaseline />
          <AppBar />
          {/* <DrawerLeft /> */}
          <Route exact path="/" component={Home}/>
        </div>
      </Router>
    )
  }
}

export default App;
