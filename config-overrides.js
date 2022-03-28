const {
  override,
  addBabelPlugin,
  addBundleVisualizer,
  addBabelPreset,
} = require("customize-cra")
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

let config = override(
  (config) => {
    config.plugins = config.plugins.filter((plugin) => {
      return plugin.key !== "ESLintWebpackPlugin"
    })
    // Adds human readable names to chunks
    config.optimization.chunkIds = "named"
    
    config.resolve.plugins.push(PnpWebpackPlugin)
    config.resolveLoader = {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module)
      ]
    }
    return config
  },
  addBabelPlugin("@emotion/babel-plugin"),
  addBabelPreset("@emotion/babel-preset-css-prop"),
  process.env.ANALYZE && addBundleVisualizer(),
)

/*eslint-disable no-param-reassign */
if (process.env.NODE_ENV === "test") {
  config = {
    babelrc: true,
    jest: (config) => {
      config.setupFilesAfterEnv = ["<rootDir>/test/setup-tests.js"]
      config.modulePaths = ["."]

      return config
    },
  }
}

module.exports = config
