const path = require('path');
var fs = require("fs");
var webpack = require("webpack");

const PATHS = {
  dashboards: path.join(__dirname, 'dashboards'),
  build: path.join(__dirname, 'build'),
  jobs: path.join(__dirname, 'jobs'),
  widgets: path.join(__dirname, 'widgets'),
  styles: path.join(__dirname, 'styles')
};

// grab all dashboards
var dashboardPaths = fs.readdirSync(PATHS.dashboards).reduce(function(map, filename) {
  map[path.basename(filename, '.jsx')] = path.join(PATHS.dashboards, filename);
  return map;
}, {});

var webConfig = {
  entry: dashboardPaths,
  target: 'web',
  output: { path: PATHS.build, filename: '[name].dashboard.bundle.js'},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need something
        // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
          options: {cacheDirectory: true}
        },
        include: [PATHS.dashboards, PATHS.widgets],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [PATHS.styles, PATHS.widgets]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'commons', filename: 'common.bundle.js'}),
    new webpack.EnvironmentPlugin({"NODE_ENV": 'development'})
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
};

module.exports = webConfig