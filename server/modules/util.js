const dateI18n = ['一', '二', '三', '四', '五', '六', '日']

class classData {
  constructor (item) {
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
      day: dateI18n.indexOf(item[12].split(/(\d)/)[0].substring(0, 1)),
      part: item[12].substring(2).replace(')', '').split(',').map(e => {
      return parseInt(e)
      })
    }
    this.exempt = item[13]
    this.cancel = item[14]
  }
}

module.exports = { classData }
