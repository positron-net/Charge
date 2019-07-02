const snappy = require('snappy') // import snappy lib
const dgram = require('dgram') // import dgram lib
const socket = dgram.createSocket('udp4') // initialize udp socket with ip V4

const EventEmitter = require('events') // create an event listener
const response = new EventEmitter() // initialize listener

// server for developpement
const server = {
  address: '127.0.0.1',
  port: 2112
}

// Message receiver
socket.on('message', (res, remote) => {
  // decompress message
  snappy.uncompress(res, { asBuffer: false }, (err, result) => {

    if (err) {
      return
    }

    result = Buffer.from(result).toString() // Stringify message
    result = JSON.parse(result) // Parse JSON
  
    console.log('[AGORA] > Message received !')
    response.emit('message', result) // Return messages
  })
})

const agora = {

  // Function to send a message to an agora server
  send (action, content) {

    // Store message contents on this object
    let message = {
      action: action,
      content: content
    }

    message = JSON.stringify(message) // Stringify JSON
    message = Buffer.from(message) // Transform to buffer

    // Compress message
    snappy.compress(message, (err, msg) => {
      // Send message
      socket.send(msg, 0, msg.length, server.port, server.address, (err, bytes) => {
        if (err) throw err
        console.log('[AGORA] > Message sent !')
      })
    })
  },

  receive () {
    return new Promise(resolve => {
      // When the client receive a message
      response.on('message', (res) => {
        // if response is equal to "CONNECT"
        if (res.message === 'OPEN_LISTENER') {
          resolve(res.content) // return content
        }
      })
    })
  },

  openListener (token) {
    return new Promise(resolve => {
      // Send "OPEN_LISTENER" message with token and port of the client to the Agora
      this.send('OPEN_LISTENER', {
        token: token,
      })

      // When the client receive a message
      response.on('message', (res) => {
        // if response is equal to "SUCCESS"
        if (res.message === 'SUCCESS') {
          resolve()
        }
      })
    })
  },

  // Connect to an agora server
  connect (token, port) {
    return new Promise(resolve => {
      // Send "CONNECT" message with token and port of the client to the Agora
      this.send('CONNECT', {
        token: token,
        port: port
      })

      // When the client receive a message
      response.on('message', (res) => {
        // if response is equal to "CONNECT"
        if (res.message === 'CONNECT') {
          resolve(res.content) // return content
        }
      })
    })
  },

  // The goal of this function is to get the IP adress with the client' token
  getIp (token) {
    return new Promise((resolve, reject) => {
      // Send "GET_IP" action to the Agora
      this.send('GET_IP', {
        token: token
      })

      // When the client receive a message
      response.on('message', (res) => {
        // if response is equal to "GET_IP"
        if (res.message === 'GET_IP') {
          resolve(res.content) // return content
        }
      })
    })
  },

  // Get random client IP adresses
  getRandomPeers (amount) {
    return new Promise((resolve, reject) => {
      // Send "GET_PEERS" action to the Agora
      this.send('GET_PEERS', {
        number: amount
      })

      // When the client receive a message
      response.on('message', (res) => {
        // if response is equal to "GET_PEERS"
        if (res.message === 'GET_PEERS') {
          resolve(res.message) // return content
        }
      })
    })
  },
  
  getServerList () {
    return new Promise((resolve, reject) => {
      // Send "GET_SERVERS" action to the Agora
      this.send('GET_SERVERS', {})

      // When the client receive a message
      response.on('message', (res) => {
        // if response is equal to "GET_SERVERS"
        if (res.message === 'GET_SERVERS') {
          resolve(res.message) // return content
        }
      })
    })
  }
}

module.exports = agora
