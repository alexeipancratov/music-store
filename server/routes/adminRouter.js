const express = require('express');
const passport = require('passport');
const DownloadEvent = require('../mongoModels/DownloadEvent');
const SocketEvent = require('../mongoModels/SocketEvent');

function createAdminRouter() {
  const adminRouter = express.Router();

  adminRouter.get('/downloadHistory', passport.authenticate('jwt', {session: false}), (_, res) => {
    DownloadEvent.find(null, (err, events) => {
      if (err) {
        return res.send(err);
      }
  
      return res.json(events);
    });
  });
  
  adminRouter.get('/eventHistory', passport.authenticate('jwt', {session: false}), (_, res) => {
    SocketEvent.find(null, (err, events) => {
      if (err) {
        return res.send(err);
      }
  
      return res.json(events);
    });
  });

  return adminRouter;
}

module.exports = createAdminRouter;