const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/geo.js",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    plugins: [
        new Dotenv({
          sample: './.env.default',
          path: './.env'
        }),
      ],
  };