const fs = require('fs').promises;
const path = require('path');

module.exports = {
  mode: 'development',
  devServer: {
    proxy: [
      {
        context: ['/api', '/oauth2', '/swagger-ui', '/v3/api-docs'],
        target: 'http://localhost:8080',
      },
    ],
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
    
      devServer.app.get(['/questions*', '/ta/questions*'], async (req, res) => {
        const content = await fs.readFile('./dist/practices/basic/index.html', 'utf8');
        res.send(content);
      });
    
      devServer.app.get('/profile*', async (req, res) => {
        const content = await fs.readFile('./dist/profile/index.html', 'utf8');
        res.send(content);
      });
    
      return middlewares;
    },    
  },
};
