const TerserPlugin = require('terser-webpack-plugin');
const HtmlwebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    'index': './src/index.js',
    'page2': './src/page2.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: `./index.html`,
      inject: 'head',
      scriptLoading: 'defer',
      favicon: 'src/favicon.ico',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      base: {
        href: 'http://example.com/some/page.html'
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      hash: true,
      chunks: ['index']
    }),
    new HtmlwebpackPlugin({
      template: path.join(__dirname, `about.html`),
      filename: 'about.html',
      chunks: ['page2']
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
    minimize: false,
    minimizer: [new TerserPlugin()]
  }
}
