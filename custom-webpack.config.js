const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        TAKIDA_IMAGESTORE: JSON.stringify(process.env.TAKIDA_IMAGESTORE)
      }
    })
  ]
};
