const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const server = {
  address: '127.0.0.1',
  port: 2112
}

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
    })
  },

  connect (token) {
    this.send('CONNECT', {
      token: token
    })
  },

  getIp (token) {
    return new Promise((resolve, reject) => {
      this.send('GET_IP', {
        token: token
      })
      resolve()
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