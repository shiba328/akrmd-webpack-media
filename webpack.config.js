const TerserPlugin = require('terser-webpack-plugin');
const HtmlwebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlwebpackPlugin({
      template: `./index.html`
    }),
    new GenerateSW()
  ],
  module: {
    rules: [
      // html
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
