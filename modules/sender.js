const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

module.exports = (message, address, port) => {
  message = JSON.stringify(message)
  message = Buffer.from(message)

  socket.send(message, 0, message.length, port, address, (err, bytes) => {
    if (err) console.log(err)
  })
}