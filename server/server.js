const express = require('express');
const app = express();
const musicFactory = require('./modules/musicFactory');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config.json');
require('./socket-io')(io);
require('./passport');

const searchRouter = require('./routes/searchRouter')(musicFactory);
const usersRouter = require('./routes/usersRouter')();
const adminRouter = require('./routes/adminRouter')();

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => console.log('Mongoose connected successfully'),
    (err) => console.log('Mongoose could not connect to database ' + err));

app.use(cors());
app.use(express.json());

app.use('/search', searchRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

app.use('/assets', express.static(__dirname + '/public'));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/musicData', (_, res) => {
  res.json(musicFactory.getMusicData());
});

app.post('/download', (req, res) => {
  const id = req.query.id;

  musicFactory.downloadSong(id);
  res.send(`Download song with Id ${id}`);
});

server.listen(config.serverPort, () => {
  console.log(`server started listening on port: ${config.serverPort}`);
});