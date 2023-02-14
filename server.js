"use strict";

const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

const PORT1 = 3001;
const PORT = process.env.PORT || 3001;

app.get("/searchImage", searchHandler);

async function searchHandler(req, res) {
  const searchQuery = req.query.searchQuery;
  const key = process.env.API_Key;
  const url = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${key}`;
  try {
    let photos = await axios.get(url);
    let allPhotos = photos.data.results.map((image) => new Photo(image));
    console.log({ allPhotos });
    res.status(200).send(allPhotos);
  } catch {
    res.status(500).send("something went wrong");
  }
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
