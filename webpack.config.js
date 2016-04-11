const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'dashboards'),
  build: path.join(__dirname, 'build'),
  widgets: path.join(__dirname, 'widgets'),
  styles: path.join(__dirname, 'styles')
};

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // Set up jsx. This accepts js too thanks to RegExp
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need something
        // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        // Parse only app files! Without this it will go through entire project.
        // In addition to being slow, that will most likely result in an error.
        include: [PATHS.app, PATHS.widgets]
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: PATHS.styles
      }

    ]
  }
};
