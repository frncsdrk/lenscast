const express = require('express');

const fsList = require('../utils/fs-list');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/albums', (req, res, next) => {
  const path = req.query.path && req.query.path.replace(/"|'/g, '') || '';
  fsList.listDirectories(fsList.getRootDirectory() + '/' + path, (files) => {
    res.render(
      'albums',
      {
        files
      }
    );
  });
});

router.get('/overview', (req, res, next) => {
  const path = req.query.path && req.query.path.replace(/"|'/g, '') || '';
  fsList.listFiles(fsList.getRootDirectory() + '/' + path, (files) => {
    res.render(
      'overview',
      {
        files
      }
    );
  });
});

module.exports = router;
