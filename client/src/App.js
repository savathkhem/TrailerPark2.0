import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    
    <div>
      <Nav />
      <hr />
      <Wrapper>
      <Card />
      </Wrapper>
    </div>

  </Router>
);

export default App;
