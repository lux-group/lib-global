const timezones = require('./timezones')

const dayShortNames = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
]

const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
]

const monthShortNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
]

const pad = (val, len = 2) => ('0'.repeat(len) + String(val)).slice(-len)

function convertTZ(date, tzString) {
  try {
    return new Date(date.toLocaleString('en-US', { timeZone: tzString }))
  } catch (e) {
    const ct = Math.abs(date.getTimezoneOffset())
    const dt = date.getTime()

    const jant = Math.abs((new Date(date.getFullYear(), 0, 1)).getTimezoneOffset())
    const jult = Math.abs((new Date(date.getFullYear(), 6, 1)).getTimezoneOffset())

    const npc = Math.max(jant, jult)

    const timezone = timezones[tzString.toLowerCase()]
    let offset = timezone.u - ct

    if (ct < npc) {
      offset = timezone.d - ct
    }

    return new Date(dt + 60000 * offset)
  }
}

function calculateTimezoneOffset(date, date2) {
  const localTimezoneOffset = date.getTimezoneOffset()
  const time = Math.round(date.getTime() / 1000 / 60)
  const time2 = Math.round(date2.getTime() / 1000 / 60)
  const result = time2 - time - localTimezoneOffset
  return Math.round(result / 60)
}

function subDays(date, days) {
  return new Date(date.getTime() - days * 86400000)
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 86400000)
}

function format(date, mask) {
  const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[Ll]|"[^"]*"|'[^']*'/g

  const d = date.getDate()
  const D = date.getDay()
  const m = date.getMonth()
  const y = date.getFullYear()
  const H = date.getHours()
  const M = date.getMinutes()
  const s = date.getSeconds()
  const L = date.getMilliseconds()

  const flags = {
    d: d,
    dd: pad(d),
    ddd: dayShortNames[D],
    dddd: dayNames[D],
    m: m + 1,
    mm: pad(m + 1),
    mmm: monthShortNames[m],
    mmmm: monthNames[m],
    yy: String(y).slice(2),
    yyyy: y,
    h: H % 12 || 12,
    hh: pad(H % 12 || 12),
    H: H,
    HH: pad(H),
    M: M,
    MM: pad(M),
    s: s,
    ss: pad(s),
    l: pad(L, 3),
    L: pad(L > 99 ? Math.round(L / 10) : L),
    t: H < 12 ? 'a' : 'p',
    tt: H < 12 ? 'am' : 'pm',
    T: H < 12 ? 'A' : 'P',
    TT: H < 12 ? 'AM' : 'PM',
  }

  return mask.replace(token, s => s in flags ? flags[s] : s.slice(1, s.length - 1))
}

const getDays = (floorDate, ceilingDate, including = true) => {
  const days = [floorDate]
  let dayDate = new Date(floorDate)

  while (dayDate < ceilingDate) {
    dayDate = addDays(dayDate, 1)
    if (including && dayDate <= ceilingDate) {
      days.push(dayDate)
    } else if (!including && dayDate < ceilingDate) {
      days.push(dayDate)
    }
  }

  return days
}

const diffInDays = (date1, date2) => {
  const t2 = date2.getTime()
  const t1 = date1.getTime()

  return Math.floor((t2 - t1) / (24 * 3600 * 1000))
}

module.exports = {
  format: format,
  diffInDays: diffInDays,
  getDays: getDays,
  addDays: addDays,
  subDays: subDays,
  calculateTimezoneOffset: calculateTimezoneOffset,
  convertTZ: convertTZ,
}
