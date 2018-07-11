import React, { Component } from "react";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import CardWrapper from "../components/CardWrapper";
import API from "../utils/API";
import Modal from "../components/Modal";
import Iframe from "../components/Iframe";
import Carousel from "../components/Carousel";

const tmdbImgUrl = 'https://image.tmdb.org/t/p/w185';

const googleMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBCEE2nzor1sZUz0mC6-wKUXjQEEdEORbU&q=Movie+theaters+near+me"

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
        this.checkPosterPaths(res.data)
        return res;
      })
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err));
  }

  clickPoster(title) {
    API.getTrailers(title)
      .then((res) => {
        console.log(res);
        this.createYouTubeUrl(res.data);
        return res;
      })
      .then((res) => this.setState({ youTubes: res.data }))
      .then(() => this.openModal())
      .catch((err) => console.log (err));
  }

  checkPosterPaths(arr) {
    let newArr = arr;
    newArr.map( (movie) => {
      if (movie.poster_path === null){
        movie.poster_path = "../../public/images/placeholder.jpg";
      }
      else{
        movie.poster_path = tmdbImgUrl + movie.poster_path;
      }
    }
    )
    arr = newArr;
    return arr;
  };

  googleMaps() {
    this.openMapModal()
  }

  createYouTubeUrl (arr) {
    let newArr = arr;
    newArr.map( (video) => {
      video.id.videoId = "https://www.youtube.com/embed/"+ video.id.videoId;
    })
  }

  openModal = () => this.setState({ modal: true });

  openMapModal = () => this.setState({ mapModal: true });

  closeModal = () => this.setState({ modal: false });

  closeMapModal = () => this.setState({ mapModal: false });

  render() {
    let toggleModal;
    if (this.state.modal === true){
      toggleModal = "show";
    }
    else {
      toggleModal = "modal";
    }

    let toggleMapModal;
    if (this.state.mapModal === true){
      toggleMapModal = "show";
    }
    else {
      toggleMapModal = "modal";
    }

    return (
      <div>
        <Modal modal = {toggleMapModal} onClick = {this.closeMapModal}>
          <iFrame src= {googleMapUrl}/>
        </Modal>
        <Modal modal = {toggleModal} onClick = {this.closeModal}>
        <Carousel>
          {this.state.youTubes.map((video) => (
            <iFrame src= {video.id.videoId}/>
          ))}
        </Carousel>
        </Modal>
        <Wrapper>
          <CardWrapper>
            {this.state.movies.map((movie) => (
              <Card 
              key={movie.id} src={movie.poster_path} alt={movie.title} title= {movie.title} overview={movie.overview}
              onClick={()=>this.clickPoster(movie.title)}  googleMaps = {()=> this.googleMaps()}
              />
            ))}
          </CardWrapper>
        </Wrapper>
      </div>
    )
  }
}

export default Upcoming;
