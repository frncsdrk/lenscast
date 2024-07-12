express = require('express')
cors = require('cors')

start = () =>
  app = express()

  app.use(express.json())
  app.use(express.text({ limit: '50mb', type: 'text/*' }))
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())

  console.log('test')

  server = app.listen(9000, () =>
    console.log('app is running on', server.address().port)
  )

module.exports =
  start: start
