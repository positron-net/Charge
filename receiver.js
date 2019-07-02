const { agora, auth, receiver } = require('./index.js')

const randomPort = Math.floor(Math.random() * Date.now()).toString().slice(8)

auth.regenerate('receiver', 'Hello', 76584)
.then((ath) => {
  console.log(ath)
  agora.connect(ath, randomPort)
  .then(result => {
    agora.receive()
    .then(ips => {
      console.log(ips)
    })
  })
})