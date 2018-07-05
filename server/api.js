const api            = new (require('koa-router'))()
const model          = require('./model')

api.use('/classtable', model.classTable.routes(), model.classTable.allowedMethods())

module.exports = api
