// This file is shared across the demos.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBar from "./SearchBar";
// import API from "../utils/API";

// class pageOptions extends Component {

//   state = {
//     search: "",
//     movies: []
//   }

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   }

//   handleFormSubmit = event => {
//     event.preventDefault();
//     API.getSearch(this.state.search)
//      .then((res) => {
//        console.log(res);
//        return res;
//      })
//      .then(res => this.setState({ movies: res.data }))
//      .catch(err => console.log(err));
//   }

//   render() {
//     return (
//      <div>
//        <ListItem button>
//          <SearchBar onChange={this.handleInputChange} submit={this.handleFormSubmit}/>
//        </ListItem>
//        <ListItem component={Link} to="/" button>
//          <ListItemText primary="Home"/>
//        </ListItem>
//        <ListItem component={Link} to="/in-theaters" button>
//          <ListItemText primary="In Theaters" />
//        </ListItem>
//        <ListItem component={Link} to="/top-movies" button>
//          <ListItemText primary="Top Movies" />
//        </ListItem>
//        <ListItem component={Link} to="/top-tv" button>
//          <ListItemText primary="Top TV-Shows" />
//        </ListItem>
//        <ListItem component={Link} to="/upcoming" button>
//          <ListItemText primary="Upcoming Movies" />
//        </ListItem>
//        <ListItem component={Link} to="/all-netflix" button>
//          <ListItemText primary="All Netflix" />
//        </ListItem>
//       </div>
//     )
//   }
// }

// export default pageOptions;

export const pageOptions = (
  <div>
    <ListItem>
      <SearchBar onChange={this.handleInputChange} onSubmit={this.handleFormSubmit}/>
    </ListItem>
    <ListItem component={Link} to="/" button>
      <ListItemText primary="Home"/>
    </ListItem>
    <ListItem component={Link} to="/in-theaters" button>
      <ListItemText primary="In Theaters" />
    </ListItem>
    <ListItem component={Link} to="/top-movies" button>
      <ListItemText primary="Top Movies" />
    </ListItem>
    <ListItem component={Link} to="/top-tv" button>
      <ListItemText primary="Top TV-Shows" />
    </ListItem>
    <ListItem component={Link} to="/upcoming" button>
      <ListItemText primary="Upcoming Movies" />
    </ListItem>
  </div>
)