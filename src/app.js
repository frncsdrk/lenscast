const express = require('express')
const cors = require('cors')
const config = require('config');

const healthz = require('./routes/healthz');
const image = require('./routes/image');
const video = require('./routes/video');

start = () => {
  const app = express();

  app.use(express.json());
  app.use(express.text({ limit: '50mb', type: 'text/*' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use('/healthz', healthz);
  app.use('/image', image);
  app.use('/video', video);

  server = app.listen(process.env.LENSCAST_PORT || config.get('service.server.port'), () => {
    console.log('app is running on', server.address().port);
  });
}

module.exports = {
  start
};
