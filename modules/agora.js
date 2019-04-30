const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const EventEmitter = require('events')
const response = new EventEmitter()

const server = {
  address: '127.0.0.1',
  port: 2112
}

socket.on('message', (res, remote) => {
  res = Buffer.from(res).toString()
  res = JSON.parse(res)

  console.log('[AGORA] > Message received !')
  response.emit('message', res)
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

      response.on('message', (res) => {
        if (res.response === 'CONNECT') {
          resolve(res.content)
        }
      })
    })
  },

  getIp (token) {
    return new Promise((resolve, reject) => {
      this.send('GET_IP', {
        token: token
      })

      response.on('message', (res) => {
        if (res.response === 'GET_IP') {
          resolve(res.content)
        }
      })
    })
  },
  
  openListener (token) {
    return new Promise((resolve, reject) => {

    })
  },
  
  getRandomPeers (amount) {
    return new Promise((resolve, reject) => {
      this.send('GET_PEERS', {
        number: amount
      })

      response.on('message', (res) => {
        if (res.response === 'GET_PEERS') {
          resolve(res.message)
        }
      })
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