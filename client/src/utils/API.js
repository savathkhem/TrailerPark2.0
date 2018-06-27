import axios from "axios";
import Shows from "./shows.js";

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
    // var queryTitle = parsedTitle.toLowerCase();
    return axios.get("/api/movies/trailers/" + search);
  },
  getUpcoming: () => {
    return axios.get("api/movies/upcoming");
  },
  getNetflix: () => {
    let title = Shows.forEach(() => {
      title = Shows.title;
    });
    return axios.get("api/search/" + title);
  }
};
