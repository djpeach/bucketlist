const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const infoLogger = require('easy-log')('app:info')
const dbLogger = require('easy-log')('app:db')
const authLogger = require('easy-log')('app:auth')
const schema = require('./graphql')

mongoose.connect(`mongodb://root:root123!@ds235401.mlab.com:35401/node-bucketlist`, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
  dbLogger(`Connected to mongodb`)
})

const app = express()
const routes = require('./conf/routes')
const authMiddleware = require('./middleware/auth')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', routes)
app.use('/graphql', authMiddleware.checkAuth)
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

module.exports = app
