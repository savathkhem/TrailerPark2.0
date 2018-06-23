import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import API from "./utils/API";
import Modal from "./components/Modal";

const tmdbImgUrl = 'https://image.tmdb.org/t/p/w185';

class App extends Component {
  state = {
    movies: [],
    modal: false,
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

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    let toggleModal 
    if (this.state.modal === true){
      toggleModal = "show"
    }
    else {
      toggleModal = "modal"
    }
    return (
      <Router>
        <div>
          <Modal modal = {toggleModal} onClick = {this.closeModal}/>
          <Nav />
          <hr />
          <Wrapper>
            {this.state.movies.map((movie) => (
              <Card key={movie.id} src={tmdbImgUrl + movie.poster_path} alt={movie.title} onClick={this.openModal}/>
            ))}
          </Wrapper>
        </div>
      </Router>
    )
  }
}

export default App;
