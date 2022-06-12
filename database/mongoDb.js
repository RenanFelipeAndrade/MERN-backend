const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;
const client = new MongoClient(url);

async function connectDatabase() {
  await client.connect();
}

connectDatabase();

module.exports = {
  db: client.db("simpleNoteApp"),
};
