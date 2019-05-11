const snappy = require('snappy')
const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const EventEmitter = require('events')
const response = new EventEmitter()

const server = {
  address: 'shuttleapp.io',
  port: 2112
}

socket.on('message', (res, remote) => {
  snappy.uncompress(res, { asBuffer: false }, (err, result) => {

    if (err) {
      return
    }

    result = Buffer.from(result).toString()
    result = JSON.parse(result)
  
    console.log('[AGORA] > Message received !')
    response.emit('message', result)
  })
})

const agora = {
  send (action, content) {
    let message = {
      action: action,
      content: content
    }

    message = JSON.stringify(message)
    message = Buffer.from(message)

    snappy.compress(message, (err, msg) => {
      socket.send(msg, 0, msg.length, server.port, server.address, (err, bytes) => {
        if (err) throw err
        console.log('[AGORA] > Message sent !')
      })
    })
  },

  connect (token, port) {
    return new Promise(resolve => {
      this.send('CONNECT', {
        token: token,
        port: port
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
