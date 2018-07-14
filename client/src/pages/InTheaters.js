import React, { Component } from "react";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import CardWrapper from "../components/CardWrapper";
import API from "../utils/API";
import Modal from "../components/Modal";
import Iframe from "../components/Iframe";
import Carousel from "../components/Carousel";


const tmdbImgUrl = 'https://image.tmdb.org/t/p/w185';

const googleMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBCEE2nzor1sZUz0mC6-wKUXjQEEdEORbU&q=Movie+theaters+near+me";

//will store user info when component loads (passed down from App.js)
let user;

class Theaters extends Component {
  state = {
    movies: [],
    modal: false,
    youTubes: [],
    mapModal: false,
    pageInt: 1
  }


  componentDidMount() {
    this.getMovies()
    user = this.props.user;
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  getMovies = () => {
    //Store current array of movies to add to later. 
    let tempMoviesArr = this.state.movies;
    //grab pageNumber from state and cast as string
    let pageInt = this.state.pageInt.toString();
    
    API.getMovies(pageInt)
    .then((res) => {
      this.checkPosterPaths(res.data);
      return res;
    })
    .then((res) => {
      let newArr = tempMoviesArr.concat(res.data)
      this.setState({ movies: newArr })
    })
    .then(()=>{
      if (this.state.isLoading) {
        this.setState({isLoading: false})
      }
    })
    .catch(err => console.log(err));
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      !this.state.isLoading
    ) {
      this.nextSet()
    }
  }

  nextSet = () => {
    this.setState({isLoading: true})
    let temp = this.state.pageInt;
    temp++;
    this.setState({pageInt:temp})
    this.getMovies();
  }

  clickPoster(title) {
    API.getTrailers(title)
      .then((res) => {
        this.createYouTubeUrl(res.data);
        return res;
      })
      .then((res) => this.setState({youTubes: res.data}))
      .then(() => this.openModal())
      .catch((err) => console.log (err));
  }

  googleMaps() {
    this.openMapModal();
  }

  createYouTubeUrl (arr) {
    let newArr = arr;
    newArr.map( (video) => {
      return video.id.videoId = "https://www.youtube.com/embed/"+ video.id.videoId;
    });
  }

  checkPosterPaths(arr) {
    let newArr = arr;
    newArr.map( (movie) => {
      if (movie.poster_path === null){
        return movie.poster_path = "./images/placeholder.jpg";
      }
      else{
        return movie.poster_path = tmdbImgUrl + movie.poster_path;
      }
    });
    arr = newArr;
    return arr;
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => { 
    this.setState({ modal: false, youTubes:[]});
  };

  openMapModal = () => this.setState({ mapModal: true });
  
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
          <Iframe src= {googleMapUrl}/>
        </Modal>
        <Modal modal = {toggleModal} onClick = {this.closeModal}>
          <Carousel>
            {this.state.youTubes.map((video) => (
              <Iframe src= {video.id.videoId}/>
            ))}
          </Carousel>
        </Modal>
        <Wrapper>
          <CardWrapper>
            {this.state.movies.map((movie) => (
              <Card 
              key={movie.id} id = {movie.id} src={movie.poster_path} alt={movie.title} title= {movie.title} overview={movie.overview}
              release={movie.release_date} onClick={()=>this.clickPoster(movie.title)} googleMaps = {()=> this.googleMaps()} 
              userName= {user.displayName} user_id={user.uid} icon={true}
              />
            ))}
          </CardWrapper>
        </Wrapper>
      </div>
    )
  }
}

export default Theaters;