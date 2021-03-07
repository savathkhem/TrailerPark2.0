import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { CardContent, CardActions, Collapse, IconButton, Typography, Paper } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from "@material-ui/icons/Delete";
import MessageDrawer from './../MessageDrawer';
import { FavContent } from './../FavBtn';
import API from "../../utils/API";

const styles = theme => ({
  card: {
    width: '218px',
    margin: '5px',
    backgroundSize: 'unset',
    backgroundColor: '#424242',
    paddingTop: '8px',
    borderRadius:5,
  },
  media: {
    width: '200px',
    // paddingTop: '100%',
    backgroundSize: 'unset',
    marginLeft: '8px',
  },
  actions: {
    display: 'flex',
    padding: '0',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  primaryText: {
    // background: theme.palette.background.default,
    // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    color: '#fafafa',
  },
  header: {
    marginBottom: '0px',
    marginTop: '8px',
  },
  providerHeader: {
    color: "#f2f2f2",
    textAlign: 'left',
    marginBottom: 0,
  },
  providers: {
    color: "#f2f2f2",
    textAlign: 'left',
    marginTop: 0,
  }
});

class PosterCard extends React.Component {
  state = { 
    expanded: false,
    favOpen: false,
    modalOpen: false,
    streaming: [],
    buy: [],
    rent: [],
    streamable: '',
    buyable: '',
    rentable: '',
    status: '',
  };

  saveFavorite = () => {
    //Sends the snack
    this.handleFavClick();

    //Save movie to database here
    let movieObj = {
      title: this.props.title,
      movie_id: this.props.id,
      poster_path: this.props.src,
      overview: this.props.overview,
      release_date: this.props.release,
    }
    API.favoriteMovie(this.props.user_id, movieObj)
  }

  deleteFavorite = () => {
    API.deleteFavorite(this.props.user_id, {movie_id: this.props.id})
    this.props.foolish()
  }

  getProviders = () => {
    this.getStreamable()
    this.getBuy()
    this.getRent()
  }

  getStreamable = () => {
    let streamArray = []
    if (this.props.type === 'Movie') {
      // Movie
    API.getProviders(this.props.id)
    .then((response)=> {
        if (response.data.US.flatrate.length > 0){
          for (let i = 0; i<1; i++) {
            streamArray.push(response.data.US.flatrate[i].provider_name)
          } 
          console.log("array :"+streamArray) 
      } 
    })
    .then( () => {
      if (streamArray.length > 0) {
      this.setState({streaming: streamArray, streamable: 'Streamable On: '})
      }
    })
    .catch(err => {
      this.setState({streamable: "No Streamable Providers..."})
      console.log(err);
      return null;
    });
  } else {
    // TV
    API.getTvProviders(this.props.id)
    .then((response)=> {
        if (response.data.US.flatrate.length > 0){
          for (let i = 0; i<1; i++) {
            streamArray.push(response.data.US.flatrate[i].provider_name)
          } 
          console.log("array :"+streamArray) 
      } 
    })
    .then( () => {
      if (streamArray.length > 0) {
      this.setState({streaming: streamArray, streamable: 'Streamable On: '})
      }
    })
    .catch(err => {
      this.setState({streamable: "No Streamable Providers..."})
      console.log(err);
      return null;
    });
  }
  }

  getBuy = () => {
    let buyArray = []

    if (this.props.type === 'Movie') {
      // Movie
    API.getProviders(this.props.id)
    .then((response)=> {
        if (response.data.US.buy.length > 0){
          for (let i = 0; i<1; i++) {
            buyArray.push(response.data.US.buy[i].provider_name)
          } 
          console.log("array :"+buyArray) 
      } 
    })
    .then( () => {
      if (buyArray.length > 0) {
      this.setState({buy: buyArray, buyable: 'Purchase On: '})
      }
    })
    .catch(err => {
      this.setState({buyable: "Not Currently Available For Purchase"})
      console.log(err);
      return null;
    });
  } else {
    // tv
    API.getTvProviders(this.props.id)
    .then((response)=> {
        if (response.data.US.buy.length > 0){
          for (let i = 0; i<1; i++) {
            buyArray.push(response.data.US.buy[i].provider_name)
          } 
          console.log("array :"+buyArray) 
      } 
    })
    .then( () => {
      if (buyArray.length > 0) {
      this.setState({buy: buyArray, buyable: 'Purchase On: '})
      }
    })
    .catch(err => {
      this.setState({buyable: "Not Currently Available For Purchase"})
      console.log(err);
      return null;
    });
  }
  }

  getRent = () => {
    let rentArray = []

    if (this.props.type === 'Movie') {
      // Movie
    API.getProviders(this.props.id)
    .then((response)=> {
        if (response.data.US.rent.length > 0){
          for (let i = 0; i<1; i++) {
            rentArray.push(response.data.US.rent[i].provider_name)
          } 
          console.log("array :"+rentArray) 
      } 
    })
    .then( () => {
      if (rentArray.length > 0) {
      this.setState({rent: rentArray, rentable: 'Rentable On: '})
      }
    })
    .catch(err => {
      this.setState({rentable: "Not Currently Available For Rent..."})
      console.log(err);
      return null;
    });
  } else {
          // TV
          API.getTvProviders(this.props.id)
          .then((response)=> {
              if (response.data.US.rent.length > 0){
                for (let i = 0; i<1; i++) {
                  rentArray.push(response.data.US.rent[i].provider_name)
                } 
                console.log("array :"+rentArray) 
            } 
          })
          .then( () => {
            if (rentArray.length > 0) {
            this.setState({rent: rentArray, rentable: 'Rentable On: '})
            }
          })
          .catch(err => {
            this.setState({rentable: "Not Currently Available For Rent..."})
            console.log(err);
            return null;
          });
  }
  }
  


  handleFavClick = () => {
    this.setState(state => ({ favOpen: !state.favOpen }));
  };

  handleModalClick = () => {
    this.setState(state => ({ modalOpen: !state.modalOpen }));
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const icon = this.props.icon;
    // const GoogleMapsButton = () => <button onClick = {this.props.googleMaps}> Theaters Nearby </button>;
    const GetProvidersButton = () => <button onClick = {this.getProviders}> How can I watch this? </button>;

    return (
      <div>
        <Paper className={classes.card}>
        <div className={classes.posterBack}>
          <img
            className={classes.media}
            src={this.props.src}
            onClick={this.props.onClick}
            title={this.props.title} 
            alt ={this.props.title}  
          />
          <FavContent 
            open={this.state.favOpen}
            onClose={this.handleFavClick}
          />
        </div>
        <CardActions className={classes.actions} disableActionSpacing>
        <IconButton onClick={icon ? this.saveFavorite : this.deleteFavorite}>
        {icon ? <FavoriteIcon/> : <DeleteIcon/>}
          {/* <FavoriteIcon /> */}
        </IconButton>
          <MessageDrawer 
            title={this.props.title}
            submitComment={this.props.submitComment} 
            onCommentChange={this.props.onCommentChange}
            id={this.props.id}
            userName= {this.props.userName}
          />
          {this.props.vote_avg}
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            {/* THIS WILL BECOME KNOWLEDGE PANEL */}
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="subheading" className={classes.primaryText}>
                {this.props.title}:
              </Typography>
              <Typography paragraph variant="body2" className={classes.primaryText}>
                {this.props.overview}
              </Typography>
              <GetProvidersButton/>
              <div>
                <p className={classes.providerHeader}>{this.state.streamable}</p>
                {this.state.streaming.map((service) => <p key={service} className={classes.providers}>{service}</p>) }

                <p className={classes.providerHeader}>{this.state.buyable}</p>
                {this.state.buy.map((service) => <p key={service} className={classes.providers}>{service}</p>) }

                <p className={classes.providerHeader}>{this.state.rentable}</p>
                {this.state.rent.map((service) => <p key={service} className={classes.providers}>{service}</p>) }
              </div>
              
            </CardContent>
          </Collapse>
        </Paper>
      </div>
    );
  }
}
 
PosterCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(PosterCard);