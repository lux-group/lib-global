"use strict";

var moment = require('moment');

var constants = require('./constants');

var getTimezoneOffset = function getTimezoneOffset(offerPackageTimezoneOffset, offerType, requestTimezoneOffset) {
  if (!requestTimezoneOffset && constants.OFFERS[offerType].useTimezoneOffset) {
    return parseInt(offerPackageTimezoneOffset || 0);
  }

  return requestTimezoneOffset;
};

var getMonthsToRequest = function getMonthsToRequest(timezoneOffset, maxDate) {
  var now = moment().utcOffset(timezoneOffset);
  return moment(maxDate).diff(now, 'months') + 2;
};

var getMaxCheckInCloseDate = function getMaxCheckInCloseDate(checkInCloses) {
  var defaultMonths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : constants.DEFAULT_MONTHS_FALLBACK;
  return checkInCloses ? moment.min(moment(checkInCloses), moment().add(constants.CEILING_YEARS, 'years')).format(constants.DATE_FORMAT) : moment().add(defaultMonths, 'months').format(constants.DATE_FORMAT);
};

var getStartDate = function getStartDate(minDate, travelFromDate) {
  if (minDate && travelFromDate) {
    if (moment(travelFromDate).isAfter(moment(minDate))) {
      return moment(travelFromDate).format(constants.DATE_FORMAT);
    } else {
      return moment(minDate).format(constants.DATE_FORMAT);
    }
  }

  if (travelFromDate) {
    return moment(travelFromDate).format(constants.DATE_FORMAT);
  }

  return moment(minDate).format(constants.DATE_FORMAT);
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
  constants: constants,
  getTimezoneOffset: getTimezoneOffset,
  getMonthsToRequest: getMonthsToRequest,
  getMaxCheckInCloseDate: getMaxCheckInCloseDate,
  getStartDate: getStartDate,
  getDateFloorOffset: getDateFloorOffset
};