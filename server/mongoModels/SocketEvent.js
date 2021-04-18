const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    socket: String,
    type: {
        type: String,
        enum: ['Connection', 'Disconnect']
    },
    eventTime: Date
});

module.exports = mongoose.model('SocketEvents', schema, 'SocketEvents');