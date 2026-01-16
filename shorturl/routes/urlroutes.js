const express = require("express");
const router = express.Router();

const { makeurl, geturl, analystics, homepage } = require("../controller/controller");


// Create short URL
router.post("/", makeurl);

// Redirect to original URL using short URL
router.get("/:shorturl", geturl);

// Get analytics for a short URL
router.get("/analytics/:shorturl", analystics);



module.exports = router;
