const path = require('path');

module.exports = {
  mode: 'development', // Set mode to 'development' for easier debugging
  devServer: {
    proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:8080',
        },
      ],
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000, // The port you want to use
    open: true, // Automatically opens the browser
  }
};