const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  movie_id: {type: String, required: true},
  rating: {},
    // `comment` is an object that stores a comment id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Movie with associated comments
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]

});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
