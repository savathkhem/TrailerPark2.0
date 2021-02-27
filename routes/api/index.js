const router = require("express").Router();
const movieRoutes = require("./trailers");
const dbRoutes = require("./db");
// Movie routes
router.use("/trailers", movieRoutes);
router.use("/db", dbRoutes);

module.exports = router;
