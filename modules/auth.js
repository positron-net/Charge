const { pbkdf2 } = require('crypto')

const auth = {
  generate (id, key) {
    return new Promise(resolve => {
      pbkdf2(id, key, 100000, 16, 'sha512', (err, derivedKey) => {
        if (err) throw err
        resolve(derivedKey.toString('hex'))
      })
    })
  }
}

module.exports = auth