const router = require("express").Router();
const topTvURL = "https://api.themoviedb.org/3/tv/popular?api_key=0c9ebd7d6e76fc10f179166f9acd0665&language=en-US&page=";
const moviesURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=0c9ebd7d6e76fc10f179166f9acd0665&language=en-US&page=";
const topMoviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=0c9ebd7d6e76fc10f179166f9acd0665&language=en-US&region=us&vote_count.gte=5000&sort_by=vote_average.desc&include_adult=false&include_video=false&page=";

// Matches with "/api/movies"
router.get("/in-theaters", (req, res) => {

  console.log(moviesURL)
  axios
      .get(moviesURL)
      .then((response) => res.json(response.data.response.docs))
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


module.exports = router;
