module.exports = () => {

  console.log(`
      ____             _ __                 
     / __ \\____  _____(_) /__________  ____ 
    / /_/ / __ \\/ ___/ / __/ ___/ __ \\/ __ \\
   / ____/ /_/ (__  ) / /_/ /  / /_/ / / / /
  /_/    \\____/____/_/\\__/_/   \\____/_/ /_/ 

  `)

  const modules = {
    files: require('./modules/files.js'),
    log: require('./modules/log.js'),
    receiver: require('./modules/receiver.js'),
    sender: require('./modules/sender.js'),
    discover: require('./modules/discover.js')
  }

  modules.log.info('Charge, initiated !')
  return modules
}