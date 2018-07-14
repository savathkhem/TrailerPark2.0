const router = require("express").Router();
const axios = require ("axios");
require("dotenv").config();
const topTvURL = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=&api_key=";
const moviesURL = "https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=&api_key=";
const topMoviesUrl = "https://api.themoviedb.org/3/discover/movie?&language=en-US&region=us&vote_count.gte=5000&sort_by=vote_average.desc&include_adult=false&include_video=false&page=&api_key=";
const upcomingUrl = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=&api_key=";
const baseYoutubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
const youtubeParams = "+official+trailer&maxResults=3&key=";
const searchUrl = "https://api.themoviedb.org/3/search/movie?&language=en-US&page=&include_adult=false&api_key=";
const uTellyURL = "https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?&country=us&term=";

//API Keys
const youtubeKey = process.env.YOUTUBE_API_KEY;
const tmdbKey = process.env.TMDB_KEY;
const uTellyKey = process.env.UTELLY_KEY;

console.log(process.env.YOUTUBE_API_KEY);
console.log(process.env.TMDB_KEY);
// Matches with "/api/movies"
router.get("/in-theaters", (req, res) => {
  console.log(moviesURL + tmdbKey);
  axios
    .get(moviesURL + tmdbKey)
    .then((response) => res.json(response.data.results))
    .catch(err => res.status(422).json(err));
});

//This route gets our top movies
router.get("/top-movies", (req, res) => {
  console.log(topMoviesUrl);
  axios
    .get(topMoviesUrl + tmdbKey)
    .then((response) => res.json(response.data.results))
    .catch(err => res.status(422).json(err));
});

//This route gets our tv shows
router.get("/top-tv", (req, res) => {
  console.log(topTvURL);
  axios
    .get(topTvURL + tmdbKey)
    .then((response) => res.json(response.data.results))
    .catch(err => res.status(422).json(err));
});

//Youtube route for grabbing trailers.
router.get("/trailers/:title", (req, res) => {
  
  //saves our movie title from frontend
  let title = req.params.title;
  //builds our url for API request
  let requestUrl = baseYoutubeUrl + title + youtubeParams + youtubeKey;

  console.log(requestUrl);
  axios
    .get(requestUrl)
    .then((response) => res.json(response.data.items))
    .catch(err => res.status(422).json(err));
});

//This route gets upcoming movies
router.get("/upcoming", (req, res) => {
  console.log(upcomingUrl);
  axios
    .get(upcomingUrl + tmdbKey)
    .then((response) => res.json(response.data.results))
    .catch(err => res.status(422).json(err));
});

//This route searches for content
router.get("/search/:title", (req, res)=> {
  let title = "&query=" + req.params.title;
  let requestUrl = searchUrl+tmdbKey+title
    axios
    .get(requestUrl)
    .then((response) => res.json(response.data.results))
    .catch(err => res.status(422).json(err));
});

//Utelly
router.get("/stream/:title", (req, res) =>{
  let title = req.params.title;
  console.log('utelly', uTellyKey)
  axios({
    url: uTellyURL + title,
    method: "GET",
    headers: {
      'X-Mashape-Key': uTellyKey,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => res.json(response.data.results))
  .catch((err) => res.status(422).json(err))
})


module.exports = router;
