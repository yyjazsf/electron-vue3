// const isProduction = process.env["NODE_ENV"] === "production"

module.exports = {
  pluginOptions: {
    electronBuilder: {
      // asar: false,
      // type: "development",
      // mac: {
      //   target: "dmg"
      //   // icon: "build/icon.png"
      // },
      // copyright: "",
      // nodeIntegration: true,
      // customFileProtocol: "app://./"
      nodeIntegration: true,
      // vue-cli-electron 插件会过滤 dependencies
      externals: [
        'agora-electron-sdk'
      ]
    }
  },
  configureWebpack: {
    externals: { "agora-electron-sdk": "commonjs2 agora-electron-sdk" },
  }
};
