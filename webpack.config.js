const TerserPlugin = require('terser-webpack-plugin');
const HtmlwebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');
const fs = require('fs');

module.exports = () => {
  const loadPosts = (dir) => {
    const postFiles = fs.readdirSync(path.resolve(__dirname, dir));

    return postFiles.map(file => {
      const fileName = file.split('.')[0];

      return new HtmlwebpackPlugin({
        template: path.resolve(__dirname, './layout.pug'),
        filename: `${fileName}/index.html`,
        templateParameters: {
          file
        }
      })
    })
  }

  return {
    entry: {
      'index': './src/index.js',
    },
    plugins: [
      new GenerateSW(),
    ].concat(loadPosts('./post')),
    module: {
      rules: [
        // html
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
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
        // md
        {
          test: /\.md$/,
          use: [
            {
              loader: 'markdown-loader',
            }
          ]
        },
        //pug
        {
          test: /\.pug$/,
          use: [
            'pug-loader'
          ]
        }
      ]
    },
    optimization: {
      minimize: false,
      // minimizer: [new TerserPlugin()]
    }
  }
}
