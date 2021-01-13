// const isProduction = process.env["NODE_ENV"] === "production"
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  pluginOptions: {
    electronBuilder: {
      asar: false,
      appId: "com.ipalfish.teacher",
      productName: "teacher-tool-dev",
      type: "development",
      mac: {
        target: "dmg"
        // icon: "build/icon.png"
      },
      copyright: "",
      nodeIntegration: true,
      customFileProtocol: "app://./"
    }
  },
  configureWebpack: {
    target: "electron-renderer",
    // externals: { "agora-electron-sdk": "commonjs2 agora-electron-sdk" },
    resolve: {
      extensions: [".node"]
    },
    module: {
      rules: [
        {
          test: /\.node$/,
          loader: "node-loader"
        }
      ]
    },
    plugins: [
      new CopyPlugin([
        {
          from: "node_modules/agora-electron-sdk",
          to: "node_modules/agora-electron-sdk"
        }
      ])
    ]
  }
};
