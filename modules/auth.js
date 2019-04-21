const { pbkdf2 } = require('crypto')

const auth = {
  generate (id, key) {
    return new Promise(resolve => {
      const randomID = Math.floor(Math.random() * Date.now()).toString().slice(8)
      pbkdf2(id + randomID, key, 100000, 16, 'sha512', (err, derivedKey) => {
        if (err) throw err
        resolve({
          id: randomID,
          token: derivedKey.toString('hex')
        })
      })
    })
  },

  regenerate (id, key, uid) {
    return new Promise(resolve => {
      pbkdf2(id + uid, key, 100000, 16, 'sha512', (err, derivedKey) => {
        if (err) throw err
        resolve(derivedKey.toString('hex'))
      })
    })
  }
}

module.exports = auth