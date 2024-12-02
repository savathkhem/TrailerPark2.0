const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 1
});
 
// app.use("/api/", limiter, (req, res) => {...});

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
