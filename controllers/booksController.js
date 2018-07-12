const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    let id = req.params.id
    db.Comment
      .find({movie_id: id})
      // .then(dbModel => {
      //   console.log(dbModel)
      //   return dbModel;
      // })
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
  create: function(req, res) {
    console.log(req.body)
    db.Comment
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },
};
