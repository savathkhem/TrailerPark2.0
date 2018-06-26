import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBar from "./components/AppBar";
// import DrawerLeft from "./components/DrawerLeft";
import Home from "./pages/Home";
import "./App.css"

class App extends Component {

  render() {
<<<<<<< HEAD
    let toggleModal;
    if (this.state.modal === true){
      toggleModal = "show";
    }
    else {
      toggleModal = "modal";
    }
    return (
      <Router>
        <div>
          <Modal modal= {toggleModal} onClick= {this.closeModal}>
            {this.state.youTubes.map((video) => (
              <iFrame src= { "https://www.youtube.com/embed/" + video.id.videoId } />
            ))}
          </Modal>
          <Nav />
          <hr />
          <Wrapper>
            <CardWrapper>
              {/* {this.state.movies.map((movie) => (
                <Card key={movie.id} src={tmdbImgUrl + movie.poster_path} alt={movie.title} title={movie.title} onClick={()=>this.clickPoster(movie.title)}/>
              ))} */}
              <Home />
            </CardWrapper>
          </Wrapper>
=======
    const path = <Route exact path="/" component={Home}/>;
    return (
      <Router>
        <div>
        <CssBaseline />
          <AppBar />
          {/* <DrawerLeft /> */}
          <Route exact path="/" component={Home}/>
>>>>>>> 522099514ca8ccf18af25708eb336840ad2d901d
        </div>
      </Router>
    )
  }
}

export default App;
