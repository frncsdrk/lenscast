const fs = require('fs');
const config = require('config');
const express = require('express');

// const respond = require('../utils/respond');
const getRootDirectory = require('../utils/fs-list').getRootDirectory;

const router = express.Router();

/**
 * @api {get} /video Request video data
 * @apiName GetVideo
 * @apiGroup Video
 *
 * @apiVersion 0.0.0
 *
 * @apiQuery {String}  path    Path to video in root directory
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Video
 */
router.get('/', (req, res, next) => {
  // src: https://medium.com/@developerom/playing-video-from-server-using-node-js-d52e1687e378
  const path = req.query.path.replace(/"|'/g, '');
  const videoPath = getRootDirectory() + '/' + path;
  const fileExtension = path.split('.').at(-1);
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': `video/${fileExtension}`,
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': `video/${fileExtension}`,
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

module.exports = router;
