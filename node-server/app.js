const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const infoLogger = require('easy-log')('app:info')
const dbLogger = require('easy-log')('app:db')

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds235401.mlab.com:35401/node-bucketlist`)
mongoose.connection.once('open', () => {
  dbLogger(`Connected to mongodb`)
})

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true,
// }))

module.exports = app