const log = {
  info (message) {
    console.log(`[INFO] > ${message}`)
  },

  warn (message) {
    console.log(`[WANR] > ${message}`)
  },

  error (message) {
    console.log(`[ERROR] > ${message}`)
  }
}

module.exports = log