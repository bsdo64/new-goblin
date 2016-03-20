/**
 * Created by dobyeongsu on 2016. 3. 19..
 */
var path = require("path");
var webpack = require("webpack");

var root = path.join(__dirname, '..');
var dist = path.join(root, 'dist');
var entryJs = path.join(root, 'front/scripts/entry.js');

module.exports = {
  cache: true,
  entry: {
    scripts: entryJs
  },
  output: {
    path: path.join(dist, '/public/'),
    filename: "bundle.js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
