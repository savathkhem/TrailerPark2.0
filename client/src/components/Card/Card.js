import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography, Drawer, Paper } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite';

 
const styles = theme => ({
  card: {
    width: '218px',
    margin: '5px',
    backgroundSize: 'unset',
    backgroundColor: '#424242',
    paddingTop: '8px'
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
  }
});

class PosterCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.card}>
        {/* <CardHeader className={classes.header}
          subheader={this.props.title}
        /> */}
          <img
            className={classes.media}
            src={this.props.src}
            onClick={this.props.onClick}
            title={this.props.title}   
          />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
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
              <Typography paragraph variant="body2" className={classes.primaryText}>
              {this.props.title}:
              </Typography>
              <Typography paragraph className={classes.primaryText}>
                {this.props.overview}
              </Typography>
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
 