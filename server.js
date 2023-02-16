"use strict";

const express = require("express");
const axios = require("axios");
const superagent = require("superagent");
const cors = require("cors");
require("dotenv").config();
const app = express();

const loggerMiddleware = require("./middlewares/logger");
const validateMiddleware = require("./middlewares/validate");
const error500 = require("./handlers/500");
const error404 = require("./handlers/404");

app.get("/searchImage", validateMiddleware, searchHandler);
app.get("/randomImage", randomImageHandler);
app.get("*", error404);

const PORT1 = 3001;
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(loggerMiddleware);
app.use(error500);
app.use(error404);

async function searchHandler(req, res) {
  const searchQuery = req.query.searchQuery;
  const key = process.env.API_Key;
  const url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${key}`;
  // try {
  let photos = await axios.get(url);
  let allPhotos = photos.data.results.map((image) => new Photo(image));

  res.status(200).send(allPhotos);
  // } catch {
  //   res.status(500).send("something went wrong");
  // }
}

async function randomImageHandler(request, response) {
  const key = process.env.API_Key;
  const url = `https://api.unsplash.com/photos/random?client_id=${key}`;
  // try {
  let imgData = await superagent.get(url);
  console.log(imgData);
  let randomImg = await new Photo(imgData.body);
  response.status(200).send(randomImg);
  // } catch {
  //   response.status(500).send("something went wrong");
  // }
}

class Photo {
  constructor(data) {
    this.url = data.urls.small;
    this.description = data.description;
  }
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} :)`);
});
