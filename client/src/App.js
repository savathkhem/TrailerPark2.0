import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Logo from "./components/Logo";

const App = () => (
  <Router>
    <div>
      <Logo />
      <Nav />
      <Switch>
      </Switch>
    </div>
  </Router>
);

export default App;
