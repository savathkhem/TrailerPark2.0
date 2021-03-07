// This file is shared across the demos.

import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBar from "./SearchBar";

const PageOptions = (props) => (
  <div>
    <ListItem>
      <SearchBar onChange={props.onChange} handleSubmit={props.handleSubmit}/>
    </ListItem>
    <div onClick={props.onClick}>
    <ListItem component={Link} to="/favorites" button>
      <ListItemText primary="Favorites" />
    </ListItem>
    <ListItem getMovies={props.getMovies} youTubes={props.youTubes} component={Link} to="/in-theaters" button>
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
  </div>
);

export default PageOptions;