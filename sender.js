const { agora, auth, sender } = require('./index.js')

const randomPort = Math.floor(Math.random() * Date.now()).toString().slice(8)

auth.regenerate('sender', 'Hello', 76584)
.then((ath) => {
  agora.connect(ath.token, randomPort)
  .then(result => {
    console.log(result)
    agora.openListener('a27224a4d02a47c73a852f8432f6f742', result.port)
    .then(() => {
      agora.getIp('a27224a4d02a47c73a852f8432f6f742')
      then(res => {
        sender('Hello world !', res.port, res.ip, randomPort)
      })
    })
  })
})