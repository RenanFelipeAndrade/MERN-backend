import express from "express";
import { readFile } from "fs/promises";

const app = express();

app.get("/", async (request, response) => {
  response.send(await readFile("./home.html", "utf8"));
});

app.listen(process.env.PORT || 3000, () =>
  console.log("App available on http://localhost:3000")
);
