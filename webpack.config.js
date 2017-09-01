module.exports = {
  entry: './lib',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=25000' },
    ]
  },
  devServer: {
    contentBase: './build',
    inline: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss']
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
}
