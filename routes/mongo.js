const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const collectionName = "teste";

client.connect();
const db = client.db("flemis");
const collection = db.collection(collectionName);

router.get("/", async (request, response, next) => {
  // this command reads the html file and send it back as a response
  // response.send(await readFile("./home.html", "utf8"));

  const data = await collection.find().toArray();
  console.log("the data resgistered", data);
  response.send(data);
});
module.exports = router;
