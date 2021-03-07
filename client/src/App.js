import React, { Component, Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import { Home, TopTV, InTheaters, Upcoming, TopMovie } from "./pages/";
import API from "./utils/API";
import "./App.css";
import firebase from "./firebaseConfig";
import Search from "./pages/Search";
// import Spinner from "./components/Spinner"
// import Iframe from "./components/VidWrapper";
// import Carousel from "./components/Carousel";
// import ModalNew from './components/ModalNew';

const tmdbImgUrl = "https://image.tmdb.org/t/p/w185";

class App extends Component {
  state = {
    movies: [],
    isLoading: true,
    pageInt: 1,
    youTubes: [],
    modalNew: false,

    loading: true,
    authenticated: false,
    searchRedirect: false,
    searchArr: [],
    currentUser: {
      displayName: "Not Logged In",
      photoURL: "./images/blank_user.png",
      email: "none"
    }
  };

// ---------- passing in functions to inTheater

  //   getMovies = () => {
  //     //Store current array of movies to add to later.
  //     let tempMoviesArr = this.state.movies;
  //     //grab pageNumber from state and cast as string
  //     let pageInt = this
  //         .state
  //         .pageInt
  //         .toString();

  //     API
  //         .getMovies(pageInt)
  //         .then((res) => {
  //             this.checkPosterPaths(res.data);
  //             return res;
  //         })
  //         .then((res) => {
  //             let newArr = tempMoviesArr.concat(res.data)
  //             this.setState({movies: newArr})
  //         })
  //         .then(() => {
  //             if (!this.state.isLoading) {
  //                 this.setState({isLoading: true})
  //             }
  //         })
  //         .catch(err => console.log(err));
  // }

  // onScroll = () => {
  //     if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && this.state.isLoading) {
  //         this.nextSet()
  //     }
  // }

  // nextSet = () => {
  //     this.setState({isLoading: false})
  //     let temp = this.state.pageInt;
  //     temp++;
  //     this.setState({pageInt: temp})
  //     this.getMovies();
  // }

  // clickPoster(title) {
  //     this.setState({isLoading: false})
  //     API
  //         .getTrailers(title)
  //         .then((res) => {
  //             this.createYouTubeUrl(res.data);
  //             return res;
  //         })
  //         .then((res) => {
  //             this.setState({youTubes: res.data})
  //             this.setState({isLoading: true})
  //             this.setState({modalNew: true})
  //         })
  //         // .then(() => this.setState({modalNew: 'true'}))
  //         .catch((err) => {
  //             console.log(err)
  //             this.setState({isLoading: true})
  //         });
  // }

  
  // createYouTubeUrl(arr) {
  //     let newArr = arr;
  //     newArr.map((video) => {
  //         return video.id.videoId = "https://www.youtube.com/embed/" + video.id.videoId;
  //     });
  // }

//   handleModalNewClick = () => {
//     this.setState(state => ({
//         modalNew: !state.modalNew
//     }));
// };
  
  // checkPosterPaths(arr) {
  //     let newArr = arr;
  //     newArr.map((movie) => {
  //         if (movie.poster_path === null) {
  //             return movie.poster_path = "./images/placeholder.jpg";
  //         } else {
  //             return movie.poster_path = tmdbImgUrl + movie.poster_path;
  //         }
  //     });
  //     arr = newArr;
  //     return arr;
  // };

  // ---------

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
        let userObj = {
          name: this.state.currentUser.displayName,
          email: this.state.currentUser.email,
          user_id: this.state.currentUser.uid
        };
        API.saveUser(userObj);
      } else {
        this.setState({
          authenticated: false,
          currentUser: {
              displayName: "Not Logged In",
              photoURL: "./images/blank_user.png",
              email: "none"
            },
          loading: false
        });
      }
    });
    this.forceUpdate();
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

  componentDidUpdate() {
    if (this.state.searchRedirect === true) {
      this.setState({ searchRedirect: false });
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getSearch(this.state.search)
      .then(res => {
        console.log(res);
        this.checkPosterPaths(res.data);
        return res;
      })
      .then(res => this.setState({ searchArr: res.data }))
      .then(this.setState({ searchRedirect: true }))
      .catch(err => console.log(err));
  };



  render() {
  //   const loader = {
  //     position: 'sticky',
  //     bottom: '50vh',
  //     left: '50vw',
  //     marginLeft: '50vw',
  //     marginRight: '42vw',
  //     fontSize: 'xxx-large'
  // };
    return (
      <Fragment>
      <Router>
        <div>
          <CssBaseline />
          {/* <ModalNew open={this.state.modalNew} onClose={this.handleModalNewClick}>
            <Carousel>
                {this
                    .state
                    .youTubes
                    .map((video) => (<Iframe key={video.id.videoId} src={video.id.videoId}/>))}
              </Carousel>
          </ModalNew> */}

          <AppBar
            src={this.state.currentUser.photoURL}
            alt={this.state.currentUser.displayName}
            name={this.state.currentUser.displayName}
            onChange={this.handleInputChange}
            handleSubmit={this.handleFormSubmit}
          />
          {this.state.searchRedirect && <Redirect push to="/search" />}
          <Route
            exact
            path="/login"
            render={() => <InTheaters user={this.state.currentUser} />}
          />
          <Route
            exact
            path="/"
            render={() => <InTheaters 
              user={this.state.currentUser}
               />}
          />
          <Route
            exact
            path="/favorites"
            render={() => <Home user={this.state.currentUser} />}
          />
          <Route
            exact
            path="/in-theaters"
            render={() => <InTheaters user={this.state.currentUser} />}
          />
          <Route
            exact
            path="/top-tv"
            render={() => <TopTV user={this.state.currentUser} />}
          />
          <Route
            exact
            path="/upcoming"
            render={() => <Upcoming user={this.state.currentUser} />}
          />
          <Route
            exact
            path="/top-movies"
            render={() => <TopMovie user={this.state.currentUser} />}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <Search
                movies={this.state.searchArr}
                user={this.state.currentUser}
              />
            )}
          />
          {/* <div style={loader}>hello</div> */}
          {/* {this.state.isLoading === false
            ? <Fragment>
                    <div style={loader}>
                        <Spinner/>
                    </div>
                </Fragment>
            : <Fragment></Fragment>} */}
        </div>
      </Router>
      </Fragment>
    );
  }
}

export default App;
