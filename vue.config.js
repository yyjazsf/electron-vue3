module.exports = {
  publicPath: "./",
  outputDir: "dist_electron/bundled/",

  configureWebpack: {
    entry: './renderer/main.ts',
    target: 'electron-renderer',
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
