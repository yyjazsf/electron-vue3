const fs = require('fs')
const path = require('path')
const shell = require('shelljs');

const agoraSDK = {
    from: path.resolve(`node_modules/agora-electron-sdk`),
    to: path.resolve(`src/bin`)
}

if(!fs.existsSync(agoraSDK.to)) {
    fs.mkdirSync(agoraSDK.to)
}

shell.cp('-R', agoraSDK.from, agoraSDK.to);
