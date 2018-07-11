const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: String, required: true },
  body: { type: String, required: true },
  movie_id: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;