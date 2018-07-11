const router = require("express").Router();
const movieRoutes = require("./movies");
const dbRoutes = require("./db");
// Movie routes
router.use("/movies", movieRoutes);
router.use("/db", dbRoutes);

module.exports = router;
