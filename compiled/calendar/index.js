"use strict";

var moment = require('moment');

var CEILING_YEARS = 3;
var DEFAULT_MONTHS_FALLBACK = 18;
var DATE_FORMAT = 'YYYY-MM-DD';

var getMonthsToRequest = function getMonthsToRequest(maxDate) {
  var now = moment();
  var diff = moment.duration(moment(maxDate).diff(now));

  if (isNaN(diff.months())) {
    return 1;
  }

  return diff.months() + 1;
};

var getMaxCheckInCloseDate = function getMaxCheckInCloseDate(checkInCloses) {
  var defaultMonths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MONTHS_FALLBACK;
  return checkInCloses ? moment.min(moment(checkInCloses), moment().add(CEILING_YEARS, 'years')).format(DATE_FORMAT) : moment().add(defaultMonths, 'months').format(DATE_FORMAT);
};

var getStartDate = function getStartDate(minDate, travelFromDate) {
  if (minDate && travelFromDate) {
    if (moment(travelFromDate).isAfter(moment(minDate))) {
      return moment(travelFromDate).format(DATE_FORMAT);
    } else {
      return moment(minDate).format(DATE_FORMAT);
    }
  }

  if (travelFromDate) {
    return moment(travelFromDate).format(DATE_FORMAT);
  }

  return moment(minDate).format(DATE_FORMAT);
};

var getDateFloorOffset = function getDateFloorOffset(_ref) {
  var timezoneOffset = _ref.timezoneOffset,
      dateFloorOffset = _ref.dateFloorOffset,
      hourOfDayThreshold = _ref.hourOfDayThreshold,
      _ref$enquiryType = _ref.enquiryType,
      enquiryType = _ref$enquiryType === void 0 ? 'customer' : _ref$enquiryType;
  if (enquiryType === 'admin') return 0;

  if (dateFloorOffset === 0) {
    var nowHours = parseInt(moment().utcOffset(timezoneOffset).format('HH'));

    if (nowHours >= hourOfDayThreshold) {
      return 1;
    }
  }

  return dateFloorOffset;
};

module.exports = {
  getMonthsToRequest: getMonthsToRequest,
  getMaxCheckInCloseDate: getMaxCheckInCloseDate,
  getStartDate: getStartDate,
  getDateFloorOffset: getDateFloorOffset
};