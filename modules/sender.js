const log = require('./log')
const Node = require('utp-punch')

const sender = new Node()

module.exports = (message, targePort, targeAddress, port) => {
  return new Promise(resolve => {
    let sender = new Node()

    sender.bind(port)
    
    sender.punch(10, targePort, targeAddress, success => {
      if (success) {
        sender.connect(targePort, targeAddress, socket => {
    
          log.info('SENDER: socket connected')
        
          socket.on('data', data => {
            console.log(data)
          })
          
          socket.on('end', () => {
            log.info('SENDER: socket disconnected');
            sender.close()
          })

          message = JSON.stringify(message)
          message = Buffer.from(message)
    
          socket.write(message)

          resolve()
        })
      }
    })
  })
}