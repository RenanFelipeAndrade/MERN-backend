const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const { db } = require("../database/mongoDb");

router.get("/", async (request, response, next) => {
  // get all articles
  const articles = await db.collection("articles").find().toArray();
  response.send(JSON.stringify(articles));
});

router.post("/", (request, response, next) => {
  const authorCollection = db.collection("authors");

  // the author object
  const author = request.body.author;

  // create a new article
  const newArticle = {
    title: request.body.title,
    text: request.body.text,
    author: author.name,
    createdAt: new Date(),
  };

  // creates a new author
  authorCollection
    .findOne({ googleId: author.googleId })
    .then((authorQuery) => {
      if (authorQuery === null)
        authorCollection
          .insertOne(author)
          .then(() => console.log("New author created"))
          .catch((error) => console.log(error));
    });

  // creates a new article
  db.collection("articles")
    .insertOne(newArticle)
    .then(() =>
      response
        .status(201)
        .send(`The article '${newArticle.title}' was created!`)
    )
    .catch((error) => response.send(`An error has occoured: ${error}`));
});

router.delete("/:articleId", async (request, response, next) => {
  // delete a article with a specified id
  const articleId = request.params.articleId;
  await db
    .collection("articles")
    .deleteOne({ _id: new ObjectId(articleId) })
    .then(() => response.send(`The article was deleted`))
    .catch((error) => response.send(`An error has occoured: ${error}`));
});

router.patch("/:articleId", async (request, response, next) => {
  // update a article with a specified id
  const article = {
    _id: request.body._id,
    title: request.body.title,
    text: request.body.text,
  };

  if (request.params.articleId !== article._id)
    return response.send(`An error has occoured`);

  await db
    .collection("articles")
    .updateOne(
      { _id: new ObjectId(article._id) },
      // update operator $set adds new fields to the document, or update if already exists
      { $set: { text: article.text, title: article.title } }
    )
    .then(() => response.send(`The article ${article.title} was updated`))
    .catch((error) => response.send(`An error has occoured: ${error}`));
});

module.exports = router;
