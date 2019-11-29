const { authLog } = require('../conf/loggers')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert('conf/bucketlistFirebase.json'),
  databaseURL: 'https://bucketlist-96454.firebaseio.com',
})

module.exports.checkAuth = async (req, res, next) => {
  if (process.env.ENV === 'dev') {
    return next()
  }

  // bc dev
  return next()

  if (!req.headers.authtoken) {
    res.status(403).send('Unauthorized')
    return
  }

  admin
    .auth()
    .verifyIdToken(req.headers.authtoken)
    .then((decodedToken) => {
      authLog(`User: ${decodedToken.uid} is authorized`)
      next()
    })
    .catch((error) => {
      authLog(`Error validating token: ${error}`)
      res.status(403).send('Unauthorized')
    })
}
