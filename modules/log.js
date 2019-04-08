const chalk = require('chalk')

const log = {
  info (message) {
    console.log(chalk.blue('[INFO] > ') + message)
  },

  warn (message) {
    console.log(chalk.yellow('[WARN] > ') + message)
  },

  error (message) {
    console.log(chalk.red('[ERROR] > ') + message)
  }
}

module.exports = log