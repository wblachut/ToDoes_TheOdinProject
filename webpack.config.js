const path = require('path')
const { optimize } = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      }
    ]
  },

  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  
  mode: "development"
}