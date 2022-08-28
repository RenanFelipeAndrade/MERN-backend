const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const { db } = require("../database/mongoDb");
const auth = require("../utils/auth");

router.get("/", auth, async (request, response) => {
  // get all articles
  const articles = await db.collection("articles").find().toArray();
  response.send(JSON.stringify(articles));
});

router.post("/", auth, (request, response, _) => {
  // create a new article
  const newArticle = {
    title: request.body.title,
    text: request.body.text,
    author: request.body.author,
    createdAt: new Date(),
  };

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

router.delete("/:articleId", auth, async (request, response) => {
  // delete a article with a specified id
  const articleId = request.params.articleId;
  await db
    .collection("articles")
    .deleteOne({ _id: new ObjectId(articleId) })
    .then(() => response.send(`The article was deleted`))
    .catch((error) => response.send(`An error has occoured: ${error}`));
});

router.patch("/:articleId", auth, async (request, response, next) => {
  // update a article with a specified id
  const article = {
    _id: request.body._id,
    title: request.body.title,
    text: request.body.text,
    author: request.body.author,
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
