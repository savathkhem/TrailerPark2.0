const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/db"
router.post("/save", booksController.saveComment);

router.post("/users",booksController.saveUser);

router.get("/comments/:id", booksController.getComments);

router.route("/favorites/:user")
    .post(booksController.favoriteMovie)
    .get(booksController.getFavorites);


module.exports = router;
