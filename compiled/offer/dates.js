"use strict";

var moment = require('moment');

var _require = require('./constants'),
    OFFER_TYPE_LAST_MINUTE_HOTEL = _require.OFFER_TYPE_LAST_MINUTE_HOTEL,
    LAST_MINUTE_CHECK_IN_LIMIT_DEFAULT = _require.LAST_MINUTE_CHECK_IN_LIMIT_DEFAULT;

var format = function format(date) {
  return date.format('YYYY-MM-DD');
};

var getMaxDate = function getMaxDate(travelToDate, numberOfNights) {
  var maxDate = moment(travelToDate).add(1, 'days'); // Travel to date inclusive

  maxDate.subtract(numberOfNights, 'days');
  return maxDate;
};

var checkInClosesFlash = function checkInClosesFlash(travelToDate, numberOfNights) {
  if (!travelToDate || !numberOfNights) {
    return null;
  }

  return format(getMaxDate(travelToDate, numberOfNights));
};

var checkInClosesLastMinute = function checkInClosesLastMinute(travelToDate, numberOfNights) {
  var timezoneOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var checkInLimit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : LAST_MINUTE_CHECK_IN_LIMIT_DEFAULT;
  var addDays = checkInLimit;
  var nowDate = moment.utc().utcOffset(timezoneOffset);
  var nowHours = parseInt(nowDate.format('HH'));

  if (nowHours < 15) {
    addDays = addDays - 1;
  }

  var checkInCloses = nowDate.add(addDays, 'days');

  if (!travelToDate || !numberOfNights) {
    return format(checkInCloses);
  }

  if (checkInCloses.isBefore(travelToDate)) {
    return format(checkInCloses);
  }

  return format(getMaxDate(travelToDate, numberOfNights));
};

var checkInCloses = function checkInCloses(offerType, travelToDate, numberOfNights, timezoneOffset, checkInLimit) {
  if (offerType === OFFER_TYPE_LAST_MINUTE_HOTEL) {
    return checkInClosesLastMinute(travelToDate, numberOfNights, timezoneOffset, checkInLimit);
  }

  return checkInClosesFlash(travelToDate, numberOfNights);
};

module.exports = {
  checkInCloses: checkInCloses
};