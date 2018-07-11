const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/db"
router.post("/save", booksController.create);

router.get("/comments/:id", booksController.findAll);


module.exports = router;
