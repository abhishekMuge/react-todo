const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/',
    proxy({
      target: 'http://royal-stats.herokuapp.com',
      changeOrigin: true,
    })
  );
};