const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const schema = require('./graphql')
const keys = require('./conf/secret-keys')
const {dbLog, gqlLog} = require('./conf/loggers')
const routes = require('./conf/routes')
const authMiddleware = require('./middleware/auth')
const requestLogger = require('./middleware/requestLogger')

const app = express()

mongoose.connect(keys.mlab.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { dbLog(`Connected to mongodb`) })
  .catch((error) => { dbLog(`Could not connect to mongodb: ${error}`) })

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(requestLogger)

app.use('/', routes)
app.use('/graphql', authMiddleware.checkAuth)
app.use('/graphql', (req, res, next) => {
  if (req.body.query) {
    gqlLog(`Query: ${req.body.query.replace(/(\r\n|\n|\r)/gm, "")}`)
  }
  next()
}, graphqlHTTP({
  schema,
  graphiql: true,
}))

module.exports = app
