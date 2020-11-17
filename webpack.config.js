const path = require('path')

module.exports = {

  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  }
}