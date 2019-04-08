const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const EventEmitter = require('events')
const events = new EventEmitter()

module.exports = (remoteAddress, port) => {
  socket.bind(port, remoteAddress)

  socket.on('message', (message, remote) => {

    message = Buffer.from(message).toString()
    message = JSON.parse(message)

    events.emit('message', {
      remote: remote,
      message: message
    })
  })

  return {
    socket: socket,
    event: events
  }
}