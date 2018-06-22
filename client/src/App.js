import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import API from "./utils/API";

const tmdbImgUrl = 'https://image.tmdb.org/t/p/w185';

class App extends Component {
  state = {
    movies: []
  }

  componentDidMount() {
    API.getMovies()
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <hr />
          <Wrapper>
            {this.state.movies.map((movie) => (
              <Card key={movie.id} src={tmdbImgUrl + movie.poster_path}/>
            ))}
          </Wrapper>
        </div>
      </Router>
    )
  }
}

export default App;
