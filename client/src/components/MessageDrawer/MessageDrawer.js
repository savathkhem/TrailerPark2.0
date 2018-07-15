import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, Divider, Typography, Grid, TextField, Button, Paper } from '@material-ui/core/';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChatIcon from '@material-ui/icons/Chat';
import API from "../../utils/API";
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  body: {
    // backgroundColor: '#424242',
  },
  list: {
    width: 250,
    height: '100%',
    // backgroundColor: '#424242',
    marginLeft: 5,
    marginRight: 5,  },
  primaryText: {
    color: '#424242',
  },
  root: {
  },
  paper: {
    marginBottom: 10,
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  button: {
    float: 'right',
    margin: theme.spacing.unit,
  },
  form: {
    marginBottom: 50
  }
});

class MessageDrawer extends React.Component {
  state = {
    left: false,
    comments: [],
  };

  componentDidMount() {
    API.getComments(this.props.id)
    .then(res => this.setState({comments: res.data}))
  };

  submitComment = (id) => {
    let commentObj = {
      user: this.props.userName,
      body: this.state.comment,
      movie_id: id
    }
    API.saveComment(commentObj);
    let tempComments = this.state.comments;
    tempComments.push(commentObj);
    this.setState({comments: tempComments})
  };

  onCommentChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <IconButton onClick={this.toggleDrawer('left', false)}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider/>
        <Typography paragraph variant="subheading" className={classes.primaryText}>
          {this.props.title}:
        </Typography>
        <Typography paragraph variant="body2" className={classes.primaryText}>
          <form className={classes.form}>

            <div className={classes.margin}>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField id="input-comments-reviews" label="Comments/Reviews" onChange={this.onCommentChange} name="comment" multiline={true}/>
                </Grid>
              </Grid>
            </div>

            <Button size="small" className={classes.button} onClick={()=>this.submitComment(this.props.id)}>
              Submit
            </Button>
          </form>

          <div>
            {this.state.comments.map((comment) => 
              <div key={comment._id}>
                <Paper className={classes.paper} square={false}>
                <Typography variant="body1" gutterBottom>
                  {comment.user}:  {comment.body}
                </Typography>
                </Paper>
              </div>)
            }
          </div>

          
        </Typography>
      </div>
    );

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)}><ChatIcon /></IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} className={classes.paper}>

          <div className={classes.paper}>
            {sideList}
          </div>

        </Drawer>
      </div>
    );
  }
}

MessageDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageDrawer);