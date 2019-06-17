/*
const log = require('./log.js')

const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const EventEmitter = require('events')
const events = new EventEmitter()

module.exports = (remoteAddress, port) => {
  socket.bind(port, remoteAddress)

  socket.on('error', err => {
    log.error(err)
    server.close()
  })

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
*/

////////////////////////////////////////////////////////

const log = require('./log.js')
const Node = require('utp-punch')

module.exports = (targePort, targeAddress, port) => {
  return new Promise(resolve => {
    let receiver = new Node(socket => {
      log.info('RECEIVER: socket connected')
    
      socket.on('data', data => {
        data = Buffer.from(data).toString()
        data = JSON.parse(data)

        resolve(data)
        socket.end()
      })
    
      socket.on('end', () => {
        log.info('RECEIVER: socket disconnected')
        receiver.close()
      })
    })
    
    receiver.bind(port)
    receiver.listen(() => {
      receiver.punch(10, targePort, targeAddress, success => {
        if (success) {
          log.info('RECEIVER: ready')
        }
      })
    })
  })
}