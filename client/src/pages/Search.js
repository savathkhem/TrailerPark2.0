import React, { Component } from "react";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import CardWrapper from "../components/CardWrapper";
import API from "../utils/API";
import ModalNew from "../components/ModalNew";
import Iframe from "../components/VidWrapper";
import Carousel from "../components/Carousel";

let user;

class Search extends Component {
  state = {
    movies: [],
    youTubes: [],
    modalNew: false,
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
      .then(() => this.setState({modalNew: 'true'}))
      .catch((err) => console.log (err));
  }

  openModal = () => this.setState({ modal: true });

  closeModal = () => { 
    this.setState({ modal: false, youTubes:[]});
  };

  handleModalNewClick = () => {
    this.setState(state => ({ modalNew: !state.modalNew }));
  };
  
  render() {
    return (
      <div>

        {/* YouTube Modal */}
        <ModalNew 
          open={this.state.modalNew}
          onClose={this.handleModalNewClick}>
          <Carousel>
              {this.state.youTubes.map((video) => (
              <Iframe key={video.id.videoId} src= {"https://www.youtube.com/embed/"+ video.id.videoId}/>
            ))}
          </Carousel>
        </ModalNew>
        {/* End YouTube Modal */}

        
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