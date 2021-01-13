const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

const outputDir = 'dist_electron'

shell.exec('yarn build')
shell.cp('-r', path.resolve('package.json'), path.resolve(`${outputDir}/bundled/package.json`))
shell.cp('-r', 'background/dist/**', `${outputDir}/bundled`)

shell.exec('yarn electron:pack-mac')


