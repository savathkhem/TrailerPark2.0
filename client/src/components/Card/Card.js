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
  streaming: {
    color: "#f2f2f2",
    textAlign: 'center'
  }
});

class PosterCard extends React.Component {
  state = { 
    expanded: false,
    favOpen: false,
    modalOpen: false,
    streaming: [],
    available: '',
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

  checkStream = () => {
    console.log('check stream')
    let tempArray = []
    API.checkStream(this.props.title)
    .then((response)=> {
      console.log(response.data)
      for (let i = 0; i<response.data[0].locations.length; i++) {
        console.log(response.data[0].locations[i].display_name)
        tempArray.push(response.data[0].locations[i].display_name)
      } 
    })
    .then( () => {
      this.setState({streaming: tempArray, available: 'Available On: '})
    })
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
    const GoogleMapsButton = () => <button onClick = {this.props.googleMaps}> Theaters Nearby </button>;
    const CheckStreamingButton = () => <button onClick = {this.checkStream}> Can I Stream This? </button>;
    const stream = this.props.stream;

    return (
      <div>
        <Paper className={classes.card}>
        {/* <CardHeader className={classes.header}
          subheader={this.props.title}
        /> */}
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
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
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
              {stream ? <CheckStreamingButton/> : <GoogleMapsButton/>}
              <p className={classes.streaming}>{this.state.available}</p>
              {this.state.streaming.map((service) => <p key ={service} className={classes.streaming}>{service}</p>) }
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