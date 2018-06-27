// import React from "react";
 
// const Card = (props) => (
//         <div className="card">
//             <div className="card-image waves-effect waves-block waves-light">
//                 <img src={props.src} onClick={props.onClick} alt={props.title}/>  
//             </div>
//             <div className="card-content">
//                 <span className="card-title activator grey-text text-darken-4">
//                     <div id="modal-btn-container">
//                         <a id="modal-btn" className="waves-effect waves-light btn modal-trigger" onClick={props.onClick}>{props.title}</a>
//                         <i id="more-vert-btn" className="material-icons right">more_vert</i>
//                     </div>
//                 </span>
//             </div>
//             <div id = "titlegoeshere" className="card-reveal">
//                 <span className="card-title grey-text text-darken-4">{props.title}<i className="material-icons right">close</i></span>
//                 <p>{props.overview}</p>
//                 <br />
//                 <a id="maps" className="btn modal-trigger waves-effect waves-light" href="#modal1">Theaters Nearby</a>
//             </div>
//         </div>
// );
 
// export default Card;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import "./Card.css";
 
const styles = theme => ({
  card: {
    width: '250px',
    margin: '5px',
    backgroundSize: 'unset',
  },
  media: {
    width: '250px',
    paddingTop: '100%',
    backgroundSize: 'unset',
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
avatar: {
  backgroundColor: red[500],
},
});

class RecipeReviewCard extends React.Component {
state = { expanded: false };

handleExpandClick = () => {
  this.setState(state => ({ expanded: !state.expanded }));
};

render(props) {
    const { classes } = this.props;
 
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.props.src}
            onClick={this.props.onClick}
            title={this.props.title}   
          />
          <CardActions className={classes.actions} disableActionSpacing>
            {/* <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton> */}
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
              <Typography paragraph variant="body2">
                Summary:
              </Typography>
              <Typography paragraph>
                {this.props.overview}
              </Typography>
            </CardContent>
          </Collapse>
 
        </Card>
      </div>
    );
  }
}
 
RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(RecipeReviewCard);
 