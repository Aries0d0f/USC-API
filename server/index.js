const app            = new (require('koa'))()
const api            = new (require('koa-router'))()
const cors           = require('@koa/cors')

const classTable     = require('./model/classTable')

app.use(cors())
app.use(api.routes())
api.get('/:id/:year/:sem', async ctx => {
  ctx.body = await classTable(ctx.params, ctx)
})
app.listen(3000)
