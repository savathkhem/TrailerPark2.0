const router = require("express").Router();
const axios = require ("axios");
require("dotenv").config();
const topTvURL = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=";
const moviesURL = "https://api.themoviedb.org/3/movie/now_playing?&language=en-US&page=";
const topMoviesUrl = "https://api.themoviedb.org/3/discover/movie?&language=en-US&region=us&vote_count.gte=5000&sort_by=vote_average.desc&include_adult=false&include_video=false&page=";
const upcomingUrl = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=";
const baseYoutubeUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
const youtubeParams = "+official+trailer&maxResults=3&key=";
const searchUrl = "https://api.themoviedb.org/3/search/movie?&language=en-US&page=&include_adult=false&api_key=";
const uTellyURL = "https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?&country=us&term=";

//API Keys
const youtubeKey = process.env.YOUTUBE_API_KEY;
const tmdbKey = process.env.TMDB_KEY;
const uTellyKey = process.env.UTELLY_KEY;

// Matches with "/api/movies"
router.get("/in-theaters/:page", (req, res) => {
  let pageNumber= req.params.page
  let url = moviesURL + pageNumber + "&api_key="+ tmdbKey
  axios
    .get(url)
    .then((response) => res.json(response.data.results))
    .catch(err => res.status(422).json(err));
});

//This route gets our top movies
router.get("/top-movies/:page", (req, res) => {
  let pageNumber= req.params.page
  let url = topMoviesUrl + pageNumber + "&api_key="+ tmdbKey
  axios
    .get(url)
    .then((response) => res.json(response.data.results))
    .catch(err => res.status(422).json(err));
});

//This route gets our tv shows
router.get("/top-tv/:page", (req, res) => {
  let pageNumber= req.params.page
  let url = topTvURL + pageNumber + "&api_key="+ tmdbKey
  axios
    .get(url)
    .then((response) => res.json(response.data.results))
    .catch(err => res.status(422).json(err));
});

//Youtube route for grabbing trailers.
router.get("/trailers/:title", (req, res) => {
  
  //saves our movie title from frontend
  let title = req.params.title;
  //builds our url for API request
  let requestUrl = baseYoutubeUrl + title + youtubeParams + youtubeKey;
;
  axios
    .get(requestUrl)
    .then((response) => res.json(response.data.items))
    .catch(err => res.status(422).json(err));
});

//This route gets upcoming movies
router.get("/upcoming/:page", (req, res) => {
  let pageNumber= req.params.page
  let url = upcomingUrl + pageNumber + "&api_key="+ tmdbKey
  axios
    .get(url)
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
