const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  title: { type: String, required: true },
  movie_id: {type: String, required: true, unique: true},
  poster_path: {type: String},
  overview: {type: String},
  release_date: {type: String},
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
