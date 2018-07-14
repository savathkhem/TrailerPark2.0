// This file is shared across the demos.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBar from "./SearchBar";

const PageOptions = (props) => (
  <div>
    <ListItem>
      <SearchBar onChange={props.onChange} handleSubmit={props.handleSubmit}/>
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
    <ListItem component={Link} to="/landing" button>
      <ListItemText primary="Landing Page" />
    </ListItem>
  </div>
)

export default PageOptions;