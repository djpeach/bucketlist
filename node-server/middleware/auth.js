const authLogger = require('easy-log')('app:auth')

const admin = require("firebase-admin")
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://bucketlist-96454.firebaseio.com"
});

module.exports.checkAuth = async (req, res, next) => {
  if (process.env.ENV == "dev") {
    next()
    return
  }

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
