const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const infoLogger = require('easy-log')('app:info')
const dbLogger = require('easy-log')('app:db')
const authLogger = require('easy-log')('app:auth')
const schema = require('./graphql')

var admin = require("firebase-admin")
admin.initializeApp()

const checkAuth = async (req, res, next) => {
  if (!req.headers.authtoken) {
    res.status(403).send('Unauthorized')
    return
  }

  admin.auth().verifyIdToken(req.headers.authtoken).then((decodedToken) => {
    authLogger(`User: ${decodedToken.uid} is authorized`)
    next()
  }).catch((error) => {
    authLogger('Error validating token:')
    authLogger(error)
    res.status(403).send('Unauthorized')
  })
}

mongoose.connect(`mongodb://root:root123!@ds235401.mlab.com:35401/node-bucketlist`)
mongoose.connection.once('open', () => {
  dbLogger(`Connected to mongodb`)
})

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/graphql', checkAuth)
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.get('/', function (req, res) {
  res.json({
    msg: 'Hello World!'
  });
});

module.exports = app
