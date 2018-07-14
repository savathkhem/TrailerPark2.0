import React, { Component } from "react";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import CardWrapper from "../components/CardWrapper";
import API from "../utils/API";
import Modal from "../components/Modal";
import Iframe from "../components/Iframe";
import Carousel from "../components/Carousel";


const tmdbImgUrl = 'https://image.tmdb.org/t/p/w185';

let user;

class TopMovie extends Component {
  state = {
    movies: [],
    modal: false,
    youTubes: [],
  }

  componentDidMount() {
    API.getTopMovies()
      .then((res) => {
        console.log(res);
        this.checkPosterPaths(res.data)
        return res;
      })
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err));
    user = this.props.user;
  }

  checkPosterPaths(arr) {
    let newArr = arr;
    newArr.map( (movie) => {
      if (movie.poster_path === null){
        return movie.poster_path = "../../public/images/placeholder.jpg";
      }
      else{
        return movie.poster_path = tmdbImgUrl + movie.poster_path;
      }
    });
    arr = newArr;
    return arr;
  };

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
            {this.state.movies.map((movie) => (
              <Card 
              key={movie.id} src={movie.poster_path} alt={movie.title} title= {movie.title} overview={movie.overview}
              onClick={()=>this.clickPoster(movie.title)} 
              id={movie.id}userName= {user.displayName} user_id={user.uid} icon={true} stream= {true}
              />
            ))}
          </CardWrapper>
        </Wrapper>
      </div>
    )
  }
}

export default TopMovie;
