import axios from "axios";

export default {
  getMovies: () => {
    return axios.get("/api/movies/in-theaters");
  },

  getTopMovies: (id) => {
    return axios.get("/api/movies/top-movies");
  },

  getTopTv: (id) => {
    return axios.get("/api/movies/top-tv");
  },

  getTrailers: (query) => {
    let search = query.replace(/\s/g, "+").toLowerCase();
    console.log(search);

    return axios.get("/api/movies/trailers/" + search);
  },

  getUpcoming: () => {
    return axios.get("api/movies/upcoming");
  },
  
  getSearch: (query) => {
    let search = query.replace(/\s/g, "+").toLowerCase();
    console.log(search);

    return axios.get("/api/movies/search/" + search);
  },

  getComments: (id) => {
    return axios.get("api/db/comments/" + id);
  },

  saveComment: (comment) => {
    return axios.post("api/db/save", comment);
  },

  saveUser: (user) => {
    return axios.post("api/db/users", user);
  },

  favoriteMovie: (user, movie) => {
    return axios.post("api/db/favorites/" + user, movie)
  },

  getFavorites: (user) => {
    return axios.get("api/db/favorites/" + user)
  },
}