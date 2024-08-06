const path = require('path');

const express = require('express')
const cors = require('cors')
const config = require('config');

const healthz = require('./routes/healthz');
const image = require('./routes/image');
const video = require('./routes/video');
const views = require('./routes/views');

start = () => {
  const app = express();

  const basePath = config.get('service.server.path').replace(/\/$/, '') || '';

  app.use(express.json());
  app.use(express.text({ limit: '50mb', type: 'text/*' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use(basePath + '/static', express.static('public'));

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));

  app.use(basePath + '/api/healthz', healthz);
  app.use(basePath + '/api/image', image);
  app.use(basePath + '/api/video', video);
  app.use(basePath + '/', views);

  server = app.listen(process.env.LENSCAST_PORT || config.get('service.server.port'), () => {
    console.log('app is running on', server.address().port);
    console.log('with base path:', basePath);
  });
}

module.exports = {
  start
};
