import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, Divider} from '@material-ui/core/';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChatIcon from '@material-ui/icons/Chat'
import API from "../../utils/API"

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    left: false,
    comments: [],
  };

  componentDidMount() {
    API.getComments(this.props.id)
    .then(res => this.setState({comments: res.data}))
  }

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
        Message Board Stuff Goes Here!
        <h1>{this.props.title}</h1>
        <form >
          <textarea onChange={this.props.onCommentChange} name="comment"></textarea>
          <button type = "button" onClick={this.props.submitComment}>Leave a Review</button>
        </form>
        <div>
        {this.state.comments.map((comment) => 
        <div key={comment._id}>
        <h4>{comment.user} says:</h4>
          <p>{comment.body}</p>
        </div>)}
        </div>
        <div>
        
        </div>
      </div>
    );

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)}><ChatIcon /></IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            // tabIndex={0}
            // role="button"
            // onClick={this.toggleDrawer('left', false)}
            // onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);