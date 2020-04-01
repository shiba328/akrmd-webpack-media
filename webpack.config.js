const TerserPlugin = require('terser-webpack-plugin');
const HtmlwebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [
    new HtmlwebpackPlugin({
      template: `./index.html`
    }),
    new HtmlwebpackPlugin({
      template: path.join(__dirname, `about.html`),
      filename: 'about.html'
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
      },
      //css
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: 'css-loader'
          }
        ]
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
