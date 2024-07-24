const config = require('config');
const express = require('express');

const fsList = require('../utils/fs-list');

const router = express.Router();

router.get('/', (req, res, next) => {
  // res.render('index');
  // Redirect until more features are implemented
  res.redirect('/albums');
});

router.get('/albums', (req, res, next) => {
  const path = req.query.path && req.query.path.replace(/"|'/g, '') || '';
  fsList.listDirectories(fsList.getRootDirectory() + path, (directories) => {
    res.render(
      'albums',
      {
        directories
      }
    );
  });
});

router.get('/overview', (req, res, next) => {
  const path = req.query.path && req.query.path.replace(/"|'/g, '') || '';
  fsList.listFiles(fsList.getRootDirectory() + path, (files) => {
    res.render(
      'overview',
      {
        files,
        path
      }
    );
  });
});

router.get('/detail', (req, res, next) => {
  const path = req.query.path && req.query.path.replace(/"|'/g, '') || '';
  res.render(
    'detail',
    {
      path,
      file: {
        isImage: fsList.isImage(path),
        isVideo: fsList.isVideo(path),
      },
    }
  );
});

router.get('/slideshow', (req, res, next) => {
  const path = req.query.path && req.query.path.replace(/"|'/g, '') || '';
  fsList.listFiles(fsList.getRootDirectory() + path, (files) => {
    res.render(
      'slideshow',
      {
        config: config.get('service.slideshow'),
        files,
        path,
      }
    );
  });
});

module.exports = router;
