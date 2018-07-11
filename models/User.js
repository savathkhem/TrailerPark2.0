const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  user_id: {type: String, required: true},
  favorites: {type: Array},
});

const User = mongoose.model("User", userSchema);

module.exports = User;