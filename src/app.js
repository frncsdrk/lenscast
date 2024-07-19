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

  app.use(express.json());
  app.use(express.text({ limit: '50mb', type: 'text/*' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, 'views'));

  app.use('/api/healthz', healthz);
  app.use('/api/image', image);
  app.use('/api/video', video);
  app.use('/', views);

  server = app.listen(process.env.LENSCAST_PORT || config.get('service.server.port'), () => {
    console.log('app is running on', server.address().port);
  });
}

module.exports = {
  start
};
