const { IS_ELECTRON } = process.env 

const config = {
  configureWebpack: {
    target: IS_ELECTRON ? "electron-renderer" : 'web'
  }
};

module.exports = config;
