const express = require('express');
const app = express();
const musicFactory = require('./modules/musicFactory');

const port = 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/musicData', (_, res) => {
  res.json(musicFactory.getMusicData());
});

app.get('/filterMusic', (req, res) => {
  res.json(musicFactory.fitlerMusic(
    req.query.artist,
    req.query.songTitle,
    req.query.album,
    req.query.genre));
});

app.get('/favorite', (req, res) => {
  res.json(musicFactory.addFavorite(req.query.id));
});

app.post('/download', (req, res) => {
  const id = req.query.id;

  musicFactory.downloadSong(id);
  res.send(`Download song with Id ${id}`);
});

app.listen(port, () => {
  console.log(`server started listening on port: ${port}`);
});