const classTabel            = new (require('koa-router'))()
const uscAgent              = require('../modules/uscAgent')
const { classData }         = require('../modules/util')

classTabel
  .get('/:id/:year/:sem', async ctx => {
    const res = await uscAgent({
      ...ctx.params,
      func: '(SE55C01)學生課表諮詢',
      pkgFile: 'e_schoolweb_e55.pkg',
      domQuery: ['tr', 'span[name="WORKLIST"]']
    })
    ctx.body = res.filter(e => e.length >= 15).map(e => {
      return new classData(e)
    }).splice(1)
  })

module.exports = classTabel
