const express = require("express");
const router = express.Router();
const { db } = require("../database/mongoDb");

router.get("/", async (request, response, next) => {
  const articles = await db.collection("articles").find().toArray();
  response.send(JSON.stringify(articles));
});

router.post("/", (request, response, next) => {
  const newArticle = {
    title: request.body.title,
    text: request.body.text,
  };
  db.collection("articles").insertOne(newArticle, (error, response) => {
    if (error) return response.send(`Houve um erro: ${error}`);
    return response.send(response);
  });
  response.send(`O artigo '${newArticle.title}' foi criado!`);
});

module.exports = router;
