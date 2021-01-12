/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require("copy-webpack-plugin");

/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  publicPath: "./",
  outputDir: "dist_electron/bundled",
  configureWebpack: {
    plugins: [
      new CopyPlugin([
        {
          from: "background",
          to: ""
        },
        {
          from: "package.json",
          to: ""
        }
      ])
    ]
  },
  pluginOptions: {
    electronBuilder: {
      electronVersion: "8.2.0", // agora 最大支持版本
      builderOptions: {
        mac: {
          target: "dmg"
        }
      }
    }
  },
};
