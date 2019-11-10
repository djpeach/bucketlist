const logBuilder = require('easy-log')

module.exports.debugLog = logBuilder('app:debug') // use for debugging
module.exports.serverLog = logBuilder('app:server') // use for server init and messages
module.exports.dbLog = logBuilder('app:db') // use for db messages
module.exports.gqlLog = logBuilder('app:graphql') // use for graphql messages
module.exports.requestLog = logBuilder('app:request', {colorCode: 226}) // use for requests