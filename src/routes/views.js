const config = require('config');
const express = require('express');

const fsList = require('../utils/fs-list');
const pkg = require('../../package.json');

const router = express.Router();

const basePath = config.get('service.server.path').replace(/\/$/, '') || '';

router.get('/', (req, res, next) => {
  // res.render('index');
  // Redirect until more features are implemented
  res.redirect(basePath + '/albums');
});

router.get('/albums', (req, res, next) => {
  const path = req.query.path && req.query.path.replace(/"|'/g, '') || '';
  fsList.listDirectories(fsList.getRootDirectory() + path, (directories) => {
    res.render(
      'albums',
      {
        title: 'Albums',
        version: pkg.version,
        basePath,
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
        title: 'Overview',
        version: pkg.version,
        basePath,
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
      title: 'Detail',
      version: pkg.version,
      basePath,
      path,
      file: {
        isImage: fsList.isImage(`${path}`),
        isVideo: fsList.isVideo(`${path}`),
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
        title: 'Slideshow',
        version: pkg.version,
        basePath,
        config: config.get('service.slideshow'),
        files,
        path,
      }
    );
  });
});

module.exports = router;
