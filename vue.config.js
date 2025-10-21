const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  publicPath: "",
  transpileDependencies: [],
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    stats: { warnings: false },
  },
  chainWebpack: (config) => {
    config.plugins.delete("friendly-errors");
    // Exclude apexcharts from babel-loader to avoid large file processing
    config.module
      .rule("js")
      .exclude.add(/node_modules[\/]apexcharts/)
      .end();
  },
});
