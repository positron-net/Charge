const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const EventEmitter = require('events')
const reponce = new EventEmitter()

const server = {
  address: '127.0.0.1',
  port: 2112
}

socket.on('message', (res, remote) => {
  res = Buffer.from(res).toString()
  res = JSON.parse(res)

  console.log('[AGORA] > Message received !')

  reponce.emit('message', res)
})

const agora = {
  send (action, content) {
    let message = {
      action: action,
      content: content
    }

    message = JSON.stringify(message)
    message = Buffer.from(message)

    socket.send(message, 0, message.length, server.port, server.address, (err, bytes) => {
      if (err) throw err
      console.log('[AGORA] > Message sent !')
    })
  },

  connect (token) {
    return new Promise(resolve => {
      this.send('CONNECT', {
        token: token
      })

      reponce.on('message', (res) => {
        if (res.responce === 'CONNECT') {
          resolve(res.message)
        }
      })
    })
  },

  getIp (token) {
    return new Promise((resolve, reject) => {
      this.send('GET_IP', {
        token: token
      })

      reponce.on('message', (res) => {
        if (res.responce === 'GET_IP') {
          resolve(res.message)
        }
      })
    })
  },
  
  openListener (token) {
    return new Promise((resolve, reject) => {

    })
  },
  
  getRandomClient(amount) {
    return new Promise((resolve, reject) => {
      
    })
  },
  
  getConnections() {
    return new Promise((resolve, reject) => {
      
    })
  },
  
  updateServerList () {
    return new Promise((resolve, reject) => {
      
    })
  }
}

module.exports = agora