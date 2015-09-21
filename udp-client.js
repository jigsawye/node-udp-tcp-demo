var dgram = require('dgram');

function sendUdpMessage(message) {
  var client = dgram.createSocket('udp4');
  var message = new Buffer(message);
  client.send(message, 0, message.length, 9696, 'localhost', function(err) {
    client.close();
  });
}

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    sendUdpMessage(chunk);
  }
});
