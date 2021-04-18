const express = require('express');

function createSearchRouter(musicFactory) {
  const searchRouter = express.Router();

  searchRouter.get('/filterMusic', (req, res) => {
    res.json(musicFactory.fitlerMusic(
      req.query.artist,
      req.query.songTitle,
      req.query.album,
      req.query.genre));
  });

  searchRouter.get('/favorite', (req, res) => {
    res.json(musicFactory.addFavorite(req.query.id));
  });

  return searchRouter;
}

module.exports = createSearchRouter;