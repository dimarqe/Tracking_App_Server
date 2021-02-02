const express = require('express');
const webSocket = require('ws');
const http = require('http');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.status(200).send('...Welcome -_-');
});

//websocket setup
const server = http.createServer(app);

const webSocketServer = new webSocket.Server({ server:server, path:'/wss'});

webSocketServer.on('connection', (ws) => {

    ws.on('message', function incoming(message) {
        console.log('received: '+message);
    });

    ws.send('something');
});

//start our server
server.listen(port, () => {
    console.log('Server started on port '+port+' :)');
});


// var WebSocketServer = require('ws').Server;
// var wss = new WebSocketServer({port: 8080});

// var jwt = require('jsonwebtoken');

// /**
// The way I like to work with 'ws' is to convert everything to an event if possible.
// **/
// function toEvent (message) {
//   try {
//     var event = JSON.parse(message);
//     this.emit(event.type, event.payload);
//   } catch(err) {
//     console.log('not an event' , err);
//   }
// }

// wss.on('connection', function(ws) {
//   ws.on('message', toEvent)
//     .on('authenticate', function (data) {
//       jwt.verify(data.token, options, function (err, decoded) {
//        //now is authenticated
//       });
//     });

//   ws.send('something');
// });