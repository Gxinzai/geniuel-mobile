// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    "cube-ui": {
      postCompile: false,
      theme: false
    }
  },
  devServer: {
    proxy: "http://m.geniuel.com"
  },
  lintOnSave: undefined,
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined
};
