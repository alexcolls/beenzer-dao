const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  publicPath: "",
  transpileDependencies: [
    // Exclude apexcharts from transpilation as it's already ESM and too large for Babel
    (name) => !name.includes('apexcharts')
  ],
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    stats: { warnings: false },
  },
  chainWebpack: (config) => {
    config.plugins.delete("friendly-errors");
  },
});
