const express = require('express');
const app = express();
const musicFactory = require('./modules/musicFactory');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cors = require('cors');

const SocketEvent = require('./mongoModels/SocketEvent');
const DownloadEvent = require('./mongoModels/DownloadEvent');

const searchRouter = require('./routes/searchRouter')(musicFactory);
const usersRouter = require('./routes/usersRouter')();

const port = 3001;
const connectionString = 'mongodb+srv://admin:j9VF7pzwxvHaW5r@cluster0.n6zrt.mongodb.net/AlexDB?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => console.log('Mongoose connected successfully'),
    (err) => console.log('Mongoose could not connect to database ' + err));

app.use(cors());
app.use(express.json());

app.use('/assets', express.static(__dirname + '/public'));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/musicData', (_, res) => {
  res.json(musicFactory.getMusicData());
});

app.use('/search', searchRouter);

app.post('/download', (req, res) => {
  const id = req.query.id;

  musicFactory.downloadSong(id);
  res.send(`Download song with Id ${id}`);
});

app.get('/downloadHistory', (_, res) => {
  DownloadEvent.find(null, (err, events) => {
    if (err) {
      return res.send(err);
    }

    return res.json(events);
  });
});

app.get('/eventHistory', (_, res) => {
  SocketEvent.find(null, (err, events) => {
    if (err) {
      return res.send(err);
    }

    return res.json(events);
  });
});

app.use('/users', usersRouter);

server.listen(port, () => {
  console.log(`server started listening on port: ${port}`);
});

io.on('connection', (socket) => {
  console.log('SOCKET - Connection accepted.');

  const socketEvent = new SocketEvent({
    socket: socket.id,
    type: 'Connection',
    eventTime: new Date()
  });
  socketEvent.save();

  socket.on('download', (id) => {
    console.log(`Received client message to download music id: ${id}`);

    socket.emit('download-received', id);

    const downloadEvent = new DownloadEvent({
      socket: socket.id,
      songId: id,
      downloadTime: new Date()
    });
    downloadEvent.save();
  });

  socket.on('disconnect', () => {
    console.log('SOCKET - Disconnected.');

    const socketEvent = new SocketEvent({
      socket: socket.id,
      type: 'Disconnect',
      eventTime: new Date()
    });
    socketEvent.save();
  });
});