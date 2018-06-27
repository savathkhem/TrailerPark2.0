// This file is shared across the demos.

import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBar from "./SearchBar";

export const pageOptions = (
  <div>
    <ListItem button>
      <SearchBar />
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
    <ListItem component={Link} to="/all-netflix" button>
      <ListItemText primary="All Netflix" />
    </ListItem>
  </div>
);
