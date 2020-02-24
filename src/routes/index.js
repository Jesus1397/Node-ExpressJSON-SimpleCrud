const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/newBook", (req, res) => {
  res.render("newbook");
});

module.exports = router;
