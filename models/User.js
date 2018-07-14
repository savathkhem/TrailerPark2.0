const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String},
  user_id: {type: String, required: true, unique: true},
  email: {type: String},
  favorite: [{
    type: Schema.Types.ObjectId,
    ref: "Favorite"
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;