const app            = new (require('koa'))()
const cors           = require('@koa/cors')

const api            = require('./api')

app.use(cors())
app.use(api.routes())
app.listen(3000)
