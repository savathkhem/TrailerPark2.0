import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "./Home.css";



class Home extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={24} style={{ justifyContent: "center" }}>
          <Grid item md={4} className="home">
            <Paper elevation={2} rounded="false">
              <h2>List of Favorited Movies/Shows</h2>
              <br /><br /><br /><br /><br />
            </Paper>
          </Grid>
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
        </Grid>
      </div>
    )
  }
}

export default Home;
