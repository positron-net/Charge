const fs =require('fs')
const lz4 = require('lz4')

const files = {
  split (buffer) {
    return new Promise(resolve => {
      data = this.compress(buffer)
  
      let i = 0
      let part = 0
      let result = []

      while (i < data.length) {
        let buffer = data.slice(i, i += 6400)

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
      
      resolve(this.decompress(Buffer.concat(file)))
    })
  },

  read (path) {
    return fs.readFileSync(path)
  },

  write (path, buffer) {
    fs.writeFile(path, buffer, err => {
      if (err) throw err;
    })
  },

  compress (buffer) {
    return lz4.encode(buffer)
  },

  decompress (buffer) {
    return lz4.decode(buffer)
  }
}

module.exports = files