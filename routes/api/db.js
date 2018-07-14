const router = require("express").Router();
const controller = require("../../controllers/controller");

// Matches with "/api/db"
router.post("/save", controller.saveComment);

router.post("/users",controller.saveUser);

router.get("/comments/:id", controller.getComments);

router.route("/favorites/:user")
    .post(controller.favoriteMovie)
    .put(controller.removeFavorite)
    .get(controller.getFavorites);


module.exports = router;
