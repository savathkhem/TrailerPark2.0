const db = require("../models");

module.exports = {
  getComments: function(req, res) {
    let id = req.params.id
    db.Comment
      .find({movie_id: id})
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
  saveComment: function(req, res) {
    db.Comment
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
  saveUser: (req, res) => {
    //prevents duplicates by waiting for the index to load first, then creating our new user
    db.User.init().then(function() {
      db.User.create(req.body)
       .then(dbUser => res.json(dbUser))
       .catch((err) => {
        res.json(err)
         console.log("This user already exists")
        })
    })
  },

  favoriteMovie: (req, res) => {
    db.Favorite.init().then(function() {
      db.Favorite.create(req.body)
      .then(function (dbFavorite) {
        // Find a user with an `user_id` equal to `req.params.id`. Update the User to be associated with the new Movie
        // { new: true } tells the query that we want it to return the updated User -- 
        return db.User.findOneAndUpdate({ user_id: req.params.user }, {$push: {favorite: dbFavorite._id}}, { new: true });
    }) 
    .then(function (dbUser) {
        // If we were able to successfully update a User, send it back to the client
        res.json(dbUser);
    })
      //If a movie already exists, still update the User's favorites array.
    .catch(function (err) {
        res.json(err)
        db.Favorite.findOne({movie_id: req.body.movie_id})
        .then(function(dbFavorite){
          return db.User.findOneAndUpdate({ user_id: req.params.user }, {$push: {favorite: dbFavorite._id}}, { new: true });
        })
    });
    })
  },

  removeFavorite: (req, res) => {
    db.Favorite.findOne(req.body)
    .then(function (dbFavorite){
      return db.User.findOneAndUpdate({ user_id: req.params.user }, {$pull: {favorite: dbFavorite._id }});
    })
    .then(function (dbUser) {
      // If we were able to successfully update a User, send it back to the client
      res.json(dbUser);
  })
  .catch(function (err) {
      res.json(err);
  });
  },

  getFavorites: (req, res) => {
    //Find our correct user in the db
    db.User.findOne({ user_id: req.params.user })
    //then populate that users favorite movies
    .populate("favorite")
    .then(function (favorites) {
        // If success, send it back to the client
        res.json(favorites);
    })
    .catch(function (err) {
        res.json(err);
    });
  }


};
