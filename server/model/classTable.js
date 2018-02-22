const request = require('request')
const cheerio = require('cheerio')

function classData(item) {
  this.classID = item[0]
  this.year = item[1]
  this.term = item[2]
  this.class = item[3]
  this.classCode = item[4]
  this.className = item[5]
  this.termType = item[6]
  this.state = item[7]
  this.unit = item[8]
  this.credit = item[9]
  this.teacher = item[10]
  this.room = item[11]
  this.time = {
    day: item[12].split(/(\d)/)[0].substring(0, 1),
    part: item[12].substring(2).replace(')', '').split(',').map(e => {
      return parseInt(e)
    })
  }
  this.exempt = item[13]
  this.cancel = item[14]
}


module.exports = (student) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: 'https://eschool.usc.edu.tw/servlet/jform',
      headers: {
        'Accept-Language': 'zh-TW,en;q=0.8,en-US;q=0.5,ja;q=0.3',
        'Cache-Control': 'no-cache',
        Referer: 'https://eschool.usc.edu.tw/servlet/jform',
        Cookie: 'e_schoolweb_e55.pkg.emaker.uid=106991737156820155274; e_schoolweb_e55.pkg.emaker.uid_check=106991737156820155274; emaker.filename=33119655141289525959526768833706730060954445799114451576306; e_schoolweb_e55.pkg.emaker.pwd=1823790384115263733448965687179198348202',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        buttonid: 'buttonQ4',
        C_AUTONO: student.id,
        C_NAME: '',
        checkKey: 'QNMTjDAEY2x',
        em_step: '0',
        enc: '93d23f3a4c4d3f2c555e495e114a4b565311775e4c574b5e5d535a2c84301a1e75db873c3f3d793f3553505e5b795e5c4b504d763f364b574d5a4c5750535b474f007f3f3f3f3f3f3d48373f3f3f3c3f3f3f3d4b3f3d565b4c4d3f2e555e495e11535e51581176514b5a585a4d2ddd9f9bc8beb8073d3f3e763f3a495e534a5a474d3f2f555e495e11535e515811714a525d5a4db993aa2234abdfb43d3f3f474f3f3f3f384b3f3b515e525a4b3f24176c7a0a0a7c0f0e16da9287d8aba0d7958dd79e97d79491d7969d47',
        file: 'e_schoolweb_e55.pkg',
        FUNCTION_NAME: '(SE55C01)學生課表諮詢',
        K_CUST: student.id,
        K_SEM: student.sem,
        K_STUID: student.id,
        K_YEAR: student.yaer,
        locale: 'utf8',
        nf_cname: student.id,
        nf_cust: 'K_CUST',
        nf_pid: 'C_PID',
        nf_sem: 'C_SEM',
        nf_stud: 'C_STUD',
        nf_year: 'C_YEAR',
        old_CUST: 'K_STUD',
        only_stud: 'X',
        PUB_APPLY_TO: student.id,
        PUB_APPLY_STYLE: '1',
        type: 'C'
      }
    }
    request(options, (error, response, body) => {
      if (error) throw new Error(error)

      $ = cheerio.load(body, {
        withDomLvl1: true,
        ignoreWhitespace: true,
        xmlMode: false,
        decodeEntities: true,
        lowerCaseTags: true
      })

      let data = []

      $('tr', 'span[name="WORKLIST"]').each((i, el) => {
        data[i] = el.children.map(e => {
          return $(e.children).text()
        })
      })

      resolve(data.map(e => {
        return new classData(e)
      }).splice(1))
    })
  })
}