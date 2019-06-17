const fs = require('fs')

const home = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : process.env.HOME + "/.local/share")
global.__positron = `${home}/positron`

const checkApp = () => {
  return new Promise(resolve => {
    if (!fs.existsSync(__positron)) {
      fs.mkdir(__positron, (err) => {
        if (err) throw err
    
        fs.mkdirSync(__positron + '/parts')
        fs.mkdirSync(__positron + '/files')
        resolve()
      })
    } else {
      resolve()
    }
  })
}

checkApp().then(() => {
  console.log('Positron is initialized !')
  console.log(__positron)
})

exports.mods = {
  files: require('./modules/files.js'),
  log: require('./modules/log.js'),
  receiver: require('./modules/receiver.js'),
  sender: require('./modules/sender.js'),
  agora: require('./modules/agora.js'),
  auth: require('./modules/auth.js')
}