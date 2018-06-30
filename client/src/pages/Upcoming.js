import React, { Component } from "react";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import CardWrapper from "../components/CardWrapper";
import API from "../utils/API";
import Modal from "../components/Modal";
import iFrame from "../components/iFrame";

const tmdbImgUrl = 'https://image.tmdb.org/t/p/w185';

class Upcoming extends Component {
  state = {
    movies: [],
    modal: false,
    youTubes: [],
  }

  componentDidMount() {
    API.getUpcoming()
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err));
  }

  clickPoster(title) {
    API.getTrailers(title)
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => this.setState({ youTubes: res.data }))
      .then(() => this.openModal())
      .catch((err) => console.log (err));
  }

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    let toggleModal;
    if (this.state.modal === true){
      toggleModal = "show";
    }
    else {
      toggleModal = "modal";
    }

    return (
      <div>
        <Modal modal = {toggleModal} onClick = {this.closeModal}>
          {this.state.youTubes.map((video) => (
            <iFrame src= {"https://www.youtube.com/embed/"+ video.id.videoId}/>
          ))}
        </Modal>
        <Wrapper>
          <CardWrapper>
            {this.state.movies.map((movie) => (
              <Card 
              key={movie.id} src={tmdbImgUrl + movie.poster_path} alt={movie.title} title= {movie.title} overview={movie.overview}
              onClick={()=>this.clickPoster(movie.title)}
              
              />
            ))}
          </CardWrapper>
        </Wrapper>
      </div>
    )
  }
}

export default Upcoming;
