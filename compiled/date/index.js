"use strict";

var timezones = require('./timezones');

var dayShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var pad = function pad(val) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return ('0'.repeat(len) + String(val)).slice(-len);
};

function convertTZ(date, tzString) {
  try {
    return new Date(date.toLocaleString('en-US', {
      timeZone: tzString
    }));
  } catch (e) {
    var ct = Math.abs(date.getTimezoneOffset());
    var dt = date.getTime();
    var jant = Math.abs(new Date(date.getFullYear(), 0, 1).getTimezoneOffset());
    var jult = Math.abs(new Date(date.getFullYear(), 6, 1).getTimezoneOffset());
    var npc = Math.max(jant, jult);
    var timezone = timezones[tzString.toLowerCase()];
    var offset = timezone.u - ct;

    if (ct < npc) {
      offset = timezone.d - ct;
    }

    return new Date(dt + 60000 * offset);
  }
}

function calculateTimezoneOffset(date, date2) {
  var localTimezoneOffset = date.getTimezoneOffset();
  var time = Math.round(date.getTime() / 1000 / 60);
  var time2 = Math.round(date2.getTime() / 1000 / 60);
  var result = time2 - time - localTimezoneOffset;
  return Math.round(result / 60);
}

function subDays(date, days) {
  return new Date(date.getTime() - days * 86400000);
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 86400000);
}

function format(date, mask) {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[Ll]|"[^"]*"|'[^']*'/g;
  var d = date.getDate();
  var D = date.getDay();
  var m = date.getMonth();
  var y = date.getFullYear();
  var H = date.getHours();
  var M = date.getMinutes();
  var s = date.getSeconds();
  var L = date.getMilliseconds();
  var flags = {
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
    TT: H < 12 ? 'AM' : 'PM'
  };
  return mask.replace(token, function (s) {
    return s in flags ? flags[s] : s.slice(1, s.length - 1);
  });
}

var getDays = function getDays(floorDate, ceilingDate) {
  var including = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var days = [floorDate];
  var dayDate = new Date(floorDate);

  while (dayDate < ceilingDate) {
    dayDate = addDays(dayDate, 1);

    if (including && dayDate <= ceilingDate) {
      days.push(dayDate);
    } else if (!including && dayDate < ceilingDate) {
      days.push(dayDate);
    }
  }

  return days;
};

var diffInDays = function diffInDays(date1, date2) {
  var t2 = date2.getTime();
  var t1 = date1.getTime();
  return Math.floor((t2 - t1) / (24 * 3600 * 1000));
};

module.exports = {
  format: format,
  diffInDays: diffInDays,
  getDays: getDays,
  addDays: addDays,
  subDays: subDays,
  calculateTimezoneOffset: calculateTimezoneOffset,
  convertTZ: convertTZ
};