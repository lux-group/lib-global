'use strict';

var moment = require('moment');
var pluralize = require('pluralize');

var timeLeftMessage = function timeLeftMessage(schedule, voucher) {
  var SOLD_OUT_MSG = 'Sold out';
  var OFFER_NEW = 'New';
  var ENDING_SOON = 'Ending Soon';

  if (voucher && voucher.limit_reached === true) {
    return {
      type: 'sold',
      message: SOLD_OUT_MSG
    };
  }

  var now = moment();
  var start = moment(schedule.start);
  var end = moment(schedule.end);

  var durationFromStart = moment.duration(now.diff(start));
  var leftToTheEnd = moment.duration(end.diff(now));

  var startHours = parseInt(durationFromStart.asHours());
  var endDays = parseInt(leftToTheEnd.asDays());
  var endHours = parseInt(leftToTheEnd.asHours());
  var endMinutes = parseInt(leftToTheEnd.asMinutes());

  if (startHours > 0 && startHours <= 72 && endMinutes > 0) {
    return {
      type: 'new',
      message: OFFER_NEW
    };
  }

  if (startHours > 72 && endDays > 4 && endMinutes > 0) {
    return {
      type: 'ending_soon',
      message: ENDING_SOON
    };
  }

  if (endHours > 24 && endDays <= 4 && endMinutes > 0) {
    return {
      type: 'left',
      message: pluralize('day', endDays, true) + ' left'
    };
  }

  if (endMinutes > 60 && endHours <= 24) {
    return {
      type: 'left',
      message: pluralize('hour', endHours, true) + ' left'
    };
  }

  if (endMinutes >= 0 && endMinutes <= 60) {
    return {
      type: 'left',
      message: pluralize('minute', endMinutes, true) + ' left'
    };
  }

  return {
    type: 'sold',
    message: SOLD_OUT_MSG
  };
};

module.exports = {
  timeLeftMessage: timeLeftMessage
};