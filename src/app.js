const path = require('path');

const express = require('express');
const cors = require('cors');
const responseTime = require('response-time');
const config = require('config');

const logger = require('./logger');

const healthz = require('./routes/healthz');
const image = require('./routes/image');
const video = require('./routes/video');
const views = require('./routes/views');

const getPort = () => {
  return config.has('service.server.port') ? config.get('service.server.port') : 9000;
};

start = () => {
  const app = express();

  const basePath = config.get('service.server.path').replace(/\/$/, '') || '';

  app.use(express.json());
  app.use(express.text({ limit: '50mb', type: 'text/*' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  // Request logging including response time
  app.use(responseTime((req, res, time) => {
    logger.info({
      method: req.method,
      userAgent: req.get('User-Agent'),
      url: req.url,
      statusCode: res.statusCode,
      responseTime: time,
    });
  }));

  app.use(basePath + '/static', express.static('public'));

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));

  app.use(basePath + '/api/healthz', healthz);
  app.use(basePath + '/api/image', image);
  app.use(basePath + '/api/video', video);
  app.use(basePath + '/', views);

  server = app.listen(process.env.LENSCAST_PORT || getPort(), () => {
    logger.info('app is running on %s', getPort());
    logger.info('base path: %s', basePath || '/');
  });
}

module.exports = {
  start
};
