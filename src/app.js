const express = require('express')
const cors = require('cors')

start = () => {
  const app = express();

  app.use(express.json());
  app.use(express.text({ limit: '50mb', type: 'text/*' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  server = app.listen(9000, () => {
    console.log('app is running on', server.address().port);
  });
}

module.exports = {
  start
};
