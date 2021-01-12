/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
/* eslint-enable @typescript-eslint/no-var-requires*/

const outputDir = 'dist_electron'

fs.copySync(path.resolve('./package.json'), `${outputDir}/package.json`)
