const fs =require('fs')
const snappy = require('snappy')

const log = require('./log.js')

const files = {
  split (buffer, peers) {
    return new Promise(resolve => {
      data = this.compress(buffer)
  
      let i = 0
      let part = 0
      let result = []

      while (i < data.length) {
        let buffer = data.slice(i, i += data.length / peers)

        if (buffer > 64000) {
          console.log('nope', buffer.length)
        }

        let fileData = {
          id: part,
          buffer: buffer
        }

        result.push(fileData)
        part++
      }

      resolve(result)
    })
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
    // return snappy.compressSync(buffer)
    // return zlib.deflateSync(buffer)
    return lz4.encode(buffer)
  },

  decompress (buffer) {
    // return zlib.inflateSync(buffer)
    return lz4.decode(buffer)
    /*
    const isValid = snappy.isValidCompressedSync(buffer)
    
    if (isValid) {
      return snappy.uncompressSync(buffer)
    } else {
      log.error('The compressed buffer is not valid !')
      return 'error'
    }
    */
  }
}

module.exports = files