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
  // create a new article
  const newArticle = {
    title: request.body.title,
    text: request.body.text,
  };
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
    .deleteOne({ _id: new ObjectId(articleId) }) //
    .then(() => response.send(`The article was deleted`))
    .catch((error) => console.log(error.message, "error"));
});

module.exports = router;
