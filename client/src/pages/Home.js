import React, { Component } from "react";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import CardWrapper from "../components/CardWrapper";
import API from "../utils/API";
import Modal from "../components/Modal";
import Iframe from "../components/VidWrapper";
import Carousel from "../components/Carousel";
import ModalNew from '../components/ModalNew';
import "./Home.css";

const googleMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBCEE2nzor1sZUz0mC6-wKUXjQEEdEORbU&q=Movie+theaters+near+me"

let user;

class Home extends Component {

  state = {
    movies: [],
    modal: false,
    mapModal: false,
    youTubes: [],
    comment: "",
    modalNew: false,
  }

  componentDidMount() {
    API.getFavorites(this.props.user.uid)
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(res => this.setState({ movies: res.data.favorite}))
      .catch(err => console.log(err));
    user = this.props.user;
  }

  clickPoster(title) {
    API.getTrailers(title)
      .then((res) => {
        console.log(res);
        this.createYouTubeUrl(res.data)
        return res;
      })
      .then((res) => this.setState({ youTubes: res.data }))
      .then(() => this.setState({modalNew: 'true'}))
      .catch((err) => console.log (err));
  }

  googleMaps() {
    this.openMapModal()
  }

  createYouTubeUrl (arr) {
    let newArr = arr;
    newArr.map( (video) => {
     return video.id.videoId = "https://www.youtube.com/embed/"+ video.id.videoId;
    })
  }

  openModal = () => this.setState({ modal: true });

  closeModal = () => { 
    this.setState({ modal: false, youTubes:[]})
  };

  openMapModal = () => this.setState({ mapModal: true });

  closeMapModal = () => this.setState({ mapModal: false });

  //This function is so the cards re-render when a user deletes a favorite.
  foolish = () => {
    console.log('foolish')
    API.getFavorites(this.props.user.uid)
    .then((res) => {
      console.log(res);
      return res;
    })
    .then(res => this.setState({ movies: res.data.favorite}))
    .catch(err => console.log(err));
  }

  handleModalNewClick = () => {
    this.setState(state => ({ modalNew: !state.modalNew }));
  };

  render() {
    let toggleMapModal;
    if (this.state.mapModal === true){
      toggleMapModal = "show";
    }
    else {
      toggleMapModal = "modal";
    }

    return (
      <div>


        {/* Map Modal */}
        <Modal 
          modal={toggleMapModal}
          onClick={this.closeMapModal}>
          <Iframe src= {googleMapUrl}/>
        </Modal>
        {/* End Map Modal */}


        {/* YouTube Modal */}
        <ModalNew 
        open={this.state.modalNew}
        onClose={this.handleModalNewClick}
        >
          <Carousel>
            {this.state.youTubes.map((video) => (
              <Iframe src= {video.id.videoId}/>
            ))}
          </Carousel>
        </ModalNew>
        {/* End YouTube Modal */}
                <div>
                  <Wrapper>
                    <CardWrapper>
                      {this.state.movies.map((movie) => (
                        <Card 
                        key={movie.movie_id} src={movie.poster_path} alt={movie.title} title= {movie.title} overview={movie.overview}
                        onClick={()=>this.clickPoster(movie.title)} googleMaps = {()=> this.googleMaps()}
                        id={movie.movie_id} userName= {user.displayName} user_id={user.uid} icon = {false}
                        foolish={()=>this.foolish()}
                        />
                      ))}
                    </CardWrapper>
                  </Wrapper>
                </div>

                {/* <br/><br/><br/><br/><br/> */}
        {/* <Grid container spacing={24} style={{ justifyContent: "center" }}>
          <Grid item md={4} className="home">
            <Paper elevation={2} rounded="false">
              <h2>List of Movies/Shows You Have Commented On</h2>
              <br /><br /><br /><br /><br />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={24} style={{ justifyContent: "center" }}>
          <Grid item md={4} className="home">
            <Paper elevation={2} rounded="false">
              <h2>List of Movies/Shows You Have Reviewed</h2>
              <br /><br /><br /><br /><br />
            </Paper>
          </Grid>
          <Grid item md={4} className="home">
            <Paper elevation={2} rounded="false">
              <h2>Trailers To Watch Later</h2>
              <br /><br /><br /><br /><br />
            </Paper>
          </Grid>
        </Grid> */}
      </div>
    )
  }
}

export default Home;
