const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid = require("uuid/v4");

const json_books = fs.readFileSync("src/json/books.json", "utf-8");
let books = JSON.parse(json_books);

router.get("/", (req, res) => {
  res.render("index", {
    books: books
  });
});

router.get("/newBook", (req, res) => {
  res.render("newbook");
});

router.post("/newBook", (req, res) => {
  const { title, author, image, description } = req.body;

  if (!title || !author || !image || !description) {
    res.status(400).send("Entries must have data");
    return;
  }

  let newbook = {
    id: uuid(),
    title: title,
    author: author,
    image: image,
    description: description
  };

  books.push(newbook);

  const json_books = JSON.stringify(books);
  fs.writeFileSync("src/json/books.json", json_books, "utf-8");

  res.redirect("/");
});

router.get('/deleteBook/:id', (req, res) => {
  books = books.filter(book => book.id != req.params.id);

  // saving data
  const json_books = JSON.stringify(books);
  fs.writeFileSync('src/json/books.json', json_books, 'utf-8');

  res.redirect('/')
});
module.exports = router;
