import React, { Component } from "react";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import CardWrapper from "../components/CardWrapper";
import API from "../utils/API";
import Modal from "../components/Modal";
import Iframe from "../components/Iframe";
import Carousel from "../components/Carousel";

let user;

class Search extends Component {
  state = {
    movies: [],
    modal: false,
    youTubes: [],
  }

  componentDidMount() {
    user = this.props.user;
  }

  clickPoster(title) {
    API.getTrailers(title)
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => this.setState({youTubes: res.data}))
      .then(() => this.openModal())
      .catch((err) => console.log (err));
  }

  openModal = () => this.setState({ modal: true });

  closeModal = () => { 
    this.setState({ modal: false, youTubes:[]});
  };
  
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
          <Carousel>
            {this.state.youTubes.map((video) => (
              <Iframe src= {"https://www.youtube.com/embed/"+ video.id.videoId}/>
            ))}
          </Carousel>
        </Modal>
        <Wrapper>
          <CardWrapper>
            {this.props.movies.map((movie) => (
              <Card 
              key={movie.id} src={movie.poster_path} alt={movie.title} title= {movie.title} overview={movie.overview}
              onClick={()=>this.clickPoster(movie.title)}
              id={movie.id} userName= {user.displayName} user_id={user.uid} icon={true} stream={true}
              />
            ))}
          </CardWrapper>
        </Wrapper>
      </div>
    )
  }
}

export default Search;