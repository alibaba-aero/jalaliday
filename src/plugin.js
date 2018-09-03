import jdate from './calendar'
import * as C from './constant'
import Utils from './utils'

export default (o, Dayjs, dayjs) => {
  const proto = Dayjs.prototype
  const oldParse = proto.parse
  const oldInit = proto.init
  const oldStartOf = proto.startOf
  const old$Set = proto.$set
  const oldAdd = proto.add
  const oldFormat = proto.format
  const oldDiff = proto.diff
  const oldYear = proto.year
  const oldMonth = proto.month
  const oldDate = proto.date
  const oldDaysInMonth = proto.daysInMonth

  dayjs.$C = 'gregory'
  // First Day Of Week
  dayjs.$fdow = 6 // 0: sunday, ...

  dayjs.calendar = function (calendar) {
    dayjs.$C = calendar
    return dayjs
  }

  proto.calendar = function (calendar) {
    const that = this.clone()
    that.$C = calendar
    if (that.isJalali()) {
      that.InitJalali()
    }
    return that
  }

  proto.isJalali = function () {
    return this.$C === 'jalali'
  }

  dayjs.en.jmonths = 'Farvardin_Ordibehesht_Khordaad_Tir_Mordaad_Shahrivar_Mehr_Aabaan_Aazar_Dey_Bahman_Esfand'.split('_')
  dayjs.locale(C.fa)


  const wrapper = (date, instance) => dayjs(date, {
    locale: instance.$L,
    calendar: instance.$C
  })

  proto.init = function (cfg = {}) {
    oldInit.bind(this)(cfg)

    this.$C = cfg.calendar || dayjs.$C
    if (this.isJalali()) {
      this.InitJalali()
    }
  }

  proto.parse = function (cfg) {
    let reg
    // eslint-disable-next-line no-cond-assign
    if (cfg.jalali && (typeof cfg.date === 'string')
      && (/.*[^Z]$/i.test(cfg.date)) // looking for a better way
      && (reg = cfg.date.match(C.REGEX_PARSE))) {
      // 1397-08-08 or 13970808
      const [y, m, d] = jdate.toGregorian(
        parseInt(reg[1], 10),
        parseInt(reg[2], 10),
        parseInt(reg[3] || 1, 10)
      )
      cfg.date = `${y}-${m}-${d}${reg[4] || ''}`
    }
    return oldParse.bind(this)(cfg)
  }

  proto.InitJalali = function () {
    const [jy, jm, jd] = jdate.toJalaali(this.$y, this.$M + 1, this.$D)
    this.$jy = jy
    this.$jM = jm - 1
    this.$jD = jd
  }

  proto.startOf = function (units, startOf) { // startOf -> endOf
    if (!this.isJalali()) {
      return oldStartOf.bind(this)(units, startOf)
    }
    const isStartOf = !Utils.isUndefined(startOf) ? startOf : true
    const unit = Utils.prettyUnit(units)
    const instanceFactory = (d, m, y = this.$jy) => {
      const [gy, gm, gd] = jdate.toGregorian(y, m + 1, d)
      const ins = wrapper(new Date(gy, gm - 1, gd), this)
      return isStartOf ? ins : ins.endOf(C.D)
    }
    const WModifier = (this.$W + (7 - dayjs.$fdow)) % 7
    switch (unit) {
      case C.Y:
        return isStartOf ? instanceFactory(1, 0) :
          instanceFactory(0, 0, this.$jy + 1)
      case C.M:
        return isStartOf ? instanceFactory(1, this.$jM) :
          instanceFactory(0, this.$jM + 1)
      case C.W:
        return isStartOf ? instanceFactory(this.$jD - WModifier, this.$jM) :
          instanceFactory(this.$jD + (6 - WModifier), this.$jM)
      default:
        return oldStartOf.bind(this)(units, startOf)
    }
  }

  proto.$set = function (units, int) { // private set
    if (!this.isJalali()) {
      return old$Set.bind(this)(units, int)
    }
    const unit = Utils.prettyUnit(units)
    const instanceFactory = (d, m, y = this.$jy) => {
      const [gy, gm, gd] = jdate.toGregorian(y, m + 1, d)
      this.$d.setDate(gd)
      this.$d.setMonth(gm - 1)
      this.$d.setFullYear(gy)
      return this
    }
    switch (unit) {
      case C.DATE:
        instanceFactory(int, this.$jM)
        break
      case C.M:
        instanceFactory(this.$jD, int)
        break
      case C.Y:
        instanceFactory(this.$jD, this.$jM, int)
        break
      default:
        return old$Set.bind(this)(units, int)
    }
    this.init()
    return this
  }

  proto.add = function (number, units) {
    if (!this.isJalali()) {
      return oldAdd.bind(this)(number, units)
    }
    number = Number(number) // eslint-disable-line no-param-reassign
    // units === 'ms' hard code here, will update in next release
    const unit = (units && (units.length === 1 || units === 'ms')) ? units : Utils.prettyUnit(units)
    const instanceFactory = (u, n) => {
      const date = this.set(C.DATE, 1).set(u, n + number)
      return date.set(C.DATE, Math.min(this.$jD, date.daysInMonth()))
    }
    if (['M', C.M].indexOf(unit) > -1) {
      return instanceFactory(C.M, this.$jM)
    }
    if (['y', C.Y].indexOf(unit) > -1) {
      return instanceFactory(C.Y, this.$jy)
    }
    if (['d', C.D].indexOf(unit) > -1) {
      const date = new Date(this.$d)
      date.setDate(date.getDate() + number)
      return wrapper(date, this)
    }

    return oldAdd.bind(this)(number, units)
  }

  proto.format = function (formatStr, localeObject) {
    if (!this.isJalali()) {
      return oldFormat.bind(this)(formatStr, localeObject)
    }
    const str = formatStr || C.FORMAT_DEFAULT
    const locale = localeObject || this.$locale()
    const { jmonths } = locale
    return str.replace(C.REGEX_FORMAT, (match) => {
      if (match.indexOf('[') > -1) return match.replace(/\[|\]/g, '')
      switch (match) {
        case 'YY':
          return String(this.$jy).slice(-2)
        case 'YYYY':
          return String(this.$jy)
        case 'M':
          return String(this.$jM + 1)
        case 'MM':
          return Utils.padStart(this.$jM + 1, 2, '0')
        case 'MMM':
          return jmonths[this.$jM].slice(0, 3)
        case 'MMMM':
          return jmonths[this.$jM]
        case 'D':
          return String(this.$jD)
        case 'DD':
          return Utils.padStart(this.$jD, 2, '0')
        default:
          return oldFormat.bind(this)(match, localeObject)
      }
    })
  }

  proto.diff = function (input, units, float) {
    if (!this.isJalali()) {
      return oldDiff.bind(this)(input, units, float)
    }
    const unit = Utils.prettyUnit(units)
    const that = dayjs(input)
    let result = Utils.monthDiff(this, that)
    switch (unit) {
      case C.Y:
        result /= 12
        break
      case C.M:
        break
      default: // milliseconds
        return oldDiff.bind(this)(input, units, float)
    }
    return float ? result : Utils.absFloor(result)
  }

  proto.year = function () {
    if (!this.isJalali()) {
      return oldYear.bind(this)()
    }
    return this.$jy
  }

  proto.month = function () {
    if (!this.isJalali()) {
      return oldMonth.bind(this)()
    }
    return this.$jM
  }

  proto.date = function () {
    if (!this.isJalali()) {
      return oldDate.bind(this)()
    }
    return this.$jD
  }

  proto.daysInMonth = function () {
    if (!this.isJalali()) {
      return oldDaysInMonth.bind(this)()
    }
    return this.endOf(C.M).$jD
  }

  proto.clone = function () {
    return wrapper(this.toDate(), this)
  }
}

