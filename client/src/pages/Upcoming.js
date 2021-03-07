import React, { Component, Fragment } from "react";
import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import CardWrapper from "../components/CardWrapper";
import API from "../utils/API";
import ModalNew from "../components/ModalNew";
import Iframe from "../components/VidWrapper";
import Carousel from "../components/Carousel";
import Spinner from "../components/Spinner"

const tmdbImgUrl = "https://image.tmdb.org/t/p/w185";

let user;

class Upcoming extends Component {
  state = {
    movies: [],
    isLoading: true,
    pageInt: 1,
    youTubes: [],
    modalNew: false,
  };

  componentDidMount() {
    this.getMovies();
    user = this.props.user;
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && this.state.isLoading) {
        this.nextSet()
    }
}

nextSet = () => {
    this.setState({isLoading: false})
    let temp = this.state.pageInt;
    temp++;
    this.setState({pageInt: temp})
    this.getMovies();
}

getMovies = () => {
    //Store current array of movies to add to later.
    let tempMoviesArr = this.state.movies;
    //grab pageNumber from state and cast as string
    let pageInt = this
        .state
        .pageInt
        .toString();

        API.getUpcoming(pageInt)
        .then((res) => {
            this.checkPosterPaths(res.data);
            return res;
        })
        .then((res) => {
            let newArr = tempMoviesArr.concat(res.data)
            this.setState({movies: newArr})
        })
        .then(() => {
            if (!this.state.isLoading) {
                this.setState({isLoading: true})
            }
        })
        .catch(err => console.log(err));
}

clickPoster(title) {
  this.setState({isLoading: false})
  API
      .getTrailers(title)
      .then((res) => {
          // this.createYouTubeUrl(res.data);
          return res;
      })
      .then((res) => {
          this.setState({youTubes: res.data})
          this.setState({isLoading: true})
          this.setState({modalNew: true})
      })
      .then(() => this.setState({modalNew: 'true'}))
      .catch((err) => {
          console.log(err)
          this.setState({isLoading: true})
      });
}

  checkPosterPaths(arr) {
    let newArr = arr;
    newArr.map(movie => {
      if (movie.poster_path === null) {
        return (movie.poster_path = "./images/placeholder.jpg");
      } else {
        return (movie.poster_path = tmdbImgUrl + movie.poster_path);
      }
    });
    arr = newArr;
    return arr;
  }

  googleMaps() {
    this.openMapModal();
  }

  createYouTubeUrl(arr) {
    let newArr = arr;
    newArr.map(video => {
      return (video.id.videoId =
        "https://www.youtube.com/embed/" + video.id.videoId);
    });
  }


  handleModalNewClick = () => {
    this.setState(state => ({ modalNew: !state.modalNew }));
  };

  render() {
    const loader = {
      position: 'sticky',
      bottom: '50vh',
      left: '50vw',
      marginLeft: '50vw',
      marginRight: '42vw',
      fontSize: 'xxx-large'
  };
    return (
      <Fragment>

        {/* YouTube Modal */}
        <ModalNew 
          open={this.state.modalNew}
          onClose={this.handleModalNewClick}>
          <Carousel>
              {this.state.youTubes.map((video) => (
              <Iframe src= {"https://www.youtube.com/embed/"+ video.id.videoId}/>
            ))}
          </Carousel>
        </ModalNew>
        {/* End YouTube Modal */}

        <Wrapper>
          <CardWrapper>
            {this.state.movies.map(movie => (
              <Card
              type='Movie'
                key={movie.id}
                src={movie.poster_path}
                alt={movie.title}
                title={movie.title}
                vote_avg={movie.vote_average}
                vote_count={movie.vote_count}
                overview={movie.overview}
                onClick={() => this.clickPoster(movie.title)}
                googleMaps={() => this.googleMaps()}
                id={movie.id}
                userName={user.displayName}
                user_id={user.uid}
                icon={true}
              />
            ))}
          </CardWrapper>
        </Wrapper>

        {this.state.isLoading === false
            ? <Fragment>
                    <div style={loader}>
                        <Spinner/>
                    </div>
                </Fragment>
            : <Fragment></Fragment>}

      </Fragment>
    );
  }
}

export default Upcoming;
