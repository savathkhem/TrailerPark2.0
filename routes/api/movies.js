const router = require("express").Router();
const axios = require ("axios");
require("dotenv").config();
const topTvURL = "https://api.themoviedb.org/3/tv/popular?api_key=&language=en-US&page=";
const moviesURL = "https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=&api_key=";
const topMoviesUrl = "https://api.themoviedb.org/3/discover/movie?&language=en-US&region=us&vote_count.gte=5000&sort_by=vote_average.desc&include_adult=false&include_video=false&page=&api_key=";
const baseYoutubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
const youtubeParams = "+official+trailer&maxResults=3&key=";

//API Keys
const youtubeKey = process.env.YOUTUBE_API_KEY;
const tmdbKey = process.env.TMDB_KEY;

console.log(process.env.YOUTUBE_API_KEY);
console.log(process.env.TMDB_KEY)
// Matches with "/api/movies"
router.get("/in-theaters", (req, res) => {

  console.log(moviesURL+tmdbKey)
  axios
      .get(moviesURL+tmdbKey)
      .then((response) => res.json(response.data.results))
      .catch(err => res.status(422).json(err));
});

router.get("/top-movies", (req, res) => {
  console.log(topMoviesUrl)
  axios
      .get(topMoviesUrl)
      .then((response) => res.json(response.data.response.docs))
      .catch(err => res.status(422).json(err));
});

router.get("/top-tv", (req, res) => {

  console.log(topTvURL)
  axios
      .get(topTvURL)
      .then((response) => res.json(response.data.response.docs))
      .catch(err => res.status(422).json(err));
});


router.get("/trailers/:title", (req, res) => {
  let title = req.params.title
  let requestUrl = baseYoutubeUrl+title+youtubeParams+youtubeKey;
  console.log(requestUrl);

  axios
    .get(requestUrl)
    .then((response) => res.json(response.data.items))
    .catch(err => res.status(422).json(err));
});


module.exports = router;
