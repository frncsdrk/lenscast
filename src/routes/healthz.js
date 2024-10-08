const express = require('express');

const respond = require('../utils/respond');

const router = express.Router();

/**
 * @api {get} /healthz Request service health
 * @apiName Healthz
 * @apiGroup Health
 *
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String}  message    Message text
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "OK"
 *     }
 */
router.get('/', (req, res, next) => {
  respond({
    data: {
      msg: 'OK',
    },
    next,
    res,
  });
});

module.exports = router;
