
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('socket.io-redis');
const port = process.env.PORT || 3000;

const redis_host = process.env.REDIS_HOST || 'localhost';
const redis_port = process.env.REDIS_PORT || 6379;
const redis_options = { host: redis_host, port: redis_port }
io.adapter(redis(redis_options))
app.use(express.static(__dirname + '/public'));

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
