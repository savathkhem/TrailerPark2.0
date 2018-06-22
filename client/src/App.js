import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <hr />
      <Switch>
      </Switch>
    </div>
  </Router>
);

export default App;
