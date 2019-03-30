
module.exports = () => {

  const modules = {
    files: require('./modules/files.js'),
    log: require('./modules/log.js')
  }

  module.log.info('Charge initiated !')
  return modules
}