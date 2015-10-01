var net = require('net');
var process = require('process');
var dgram = require('dgram');

process.stdin.setEncoding('utf8');

var client = [];

var udp = dgram.createSocket('udp4');

udp.on('message', function(msg, rinfo) {
  console.log('UDP data: ', msg.toString());
});

var tcp = net.createServer(function(socket) {
  console.log('CONNECTED:' + socket.remotePort + ' Port.');

  client.push(socket);

  socket.on('data', function(data) {
    console.log('TCP data: ' + data);
    socket.write('You said: ' + data);
  });

  socket.on('error', function(error) {
    console.log(error);
  });

  socket.on('close', function(data) {
    console.log('CLOSED: ' + socket.remotePort);
    client = [];
  });

});

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    client[0].write(chunk);
  }
});

udp.bind(9696, function() {
  console.log('UDP Server listening on 9696 Port.');
});

tcp.listen(6969, function() {
  console.log('TCP Server listening on 6969 Port.');
});
