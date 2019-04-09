const fs =require('fs')
const snappy = require('snappy')

const log = require('./log.js')

const files = {
  split: async (data, peers, callback) => {
    let i = 0
    let part = 0
    let result = []

    while (i < data.length) {
      await files.compress(data.slice(i, i += data.length / peers)).then(finalBuffer => {
        let fileData = {
          id: part,
          buffer: finalBuffer
        }

        result.push(fileData)
        part++
      })
    }

    callback(result)
  },

  merge (buffers) {
    return new Promise(resolve => {
      let file = []
  
      for (i in buffers) {
        file.push(buffers[i].buffer)
      }
      
      resolve(Buffer.concat(file))
    })
  },

  read (path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          log.error(err)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },

  write (path, buffer) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, buffer, err => {
        if (err) {
          log.error(err)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },

  compress (buffer) {
    return new Promise((resolve, reject) => {
      snappy.compress(buffer, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  },

  decompress (buffer) {
    return new Promise((resolve, reject) => {
      const isValid = snappy.isValidCompressedSync(buffer)
    
      if (isValid) {
        snappy.uncompress(buffer, (err, data) => {
          if (err) reject(err)
          resolve(data)
        })
      } else {
        log.error('The compressed buffer is not valid !')
        reject('unvalid buffer')
      }
    })
  }
}

module.exports = files