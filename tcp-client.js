var net = require('net');
var process = require('process');

process.stdin.setEncoding('utf8');

var client = new net.Socket();
client.connect(6969, 'localhost', function() {
  console.log('CONNECTED TO: localhost:6969');
});

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    client.write(chunk);
  }
});

client.on('data', function(data) {
  console.log('TCP DATA: ' + data);
});

client.on('close', function() {
  console.log('Connection closed');
});
