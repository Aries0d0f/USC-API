const api            = new (require('koa-router'))()
const model          = require('./model')

api.use('/classtabel', model.classTable.routes(), model.classTable.allowedMethods())

module.exports = api
