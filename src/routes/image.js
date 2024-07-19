const fs = require('fs');
const config = require('config');
const express = require('express');

// const respond = require('../utils/respond');

const router = express.Router();

/**
 * @api {get} /image Request image
 * @apiName GetImage
 * @apiGroup Image
 *
 * @apiVersion 0.0.0
 *
 * @apiQuery {String}  path    Path to image in root directory
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Image
 */
router.get('/', (req, res, next) => {
  const path = req.query.path.replace(/"|'/g, '');
  const imagePath = config.get('service.server.root_directory').replace('$whoami', process.env.USER) + '/' + path;
  const fileExtension = path.split('.').at(-1);
  const stat = fs.statSync(imagePath);
  const fileSize = stat.size;

  const head = {
    'Content-Length': fileSize,
    'Content-Type': `image/${fileExtension}`,
  };

  res.writeHead(200, head);
  fs.createReadStream(imagePath).pipe(res);
});

module.exports = router;
