const moment = require('moment')

const constants = require('./constants')

const getTimezoneOffset = (offerPackageTimezoneOffset, offerType, requestTimezoneOffset) => {
  if (!requestTimezoneOffset && constants.OFFERS[offerType].useTimezoneOffset) {
    return parseInt(offerPackageTimezoneOffset || 0)
  }

  return requestTimezoneOffset
}

const getMonthsToRequest = (timezoneOffset, maxDate) => {
  const now = moment().utcOffset(timezoneOffset)
  const diff = moment.duration(moment(maxDate).diff(now))
  return diff.months() + (12 * diff.years()) + 2 // Add 1 month for current month, add 1 month for end month
}

const getMaxCheckInCloseDate = (
  checkInCloses,
  defaultMonths = constants.DEFAULT_MONTHS_FALLBACK,
) => {
  return checkInCloses ?
    moment
      .min(moment(checkInCloses), moment().add(constants.CEILING_YEARS, 'years'))
      .format(constants.DATE_FORMAT) :
    moment().add(defaultMonths, 'months').format(constants.DATE_FORMAT)
}

const getStartDate = (minDate, travelFromDate) => {
  if (minDate && travelFromDate) {
    if (moment(travelFromDate).isAfter(moment(minDate))) {
      return moment(travelFromDate).format(constants.DATE_FORMAT)
    } else {
      return moment(minDate).format(constants.DATE_FORMAT)
    }
  }
  if (travelFromDate) {
    return moment(travelFromDate).format(constants.DATE_FORMAT)
  }
  return moment(minDate).format(constants.DATE_FORMAT)
}

const getDateFloorOffset = ({
  timezoneOffset,
  dateFloorOffset,
  hourOfDayThreshold,
  enquiryType = 'customer',
}) => {
  if (enquiryType === 'admin') return 0

  if (dateFloorOffset === 0) {
    const nowHours = parseInt(moment().utcOffset(timezoneOffset).format('HH'))
    if (nowHours >= hourOfDayThreshold) {
      return 1
    }
  }

  return dateFloorOffset
}

module.exports = {
  constants,
  getTimezoneOffset,
  getMonthsToRequest,
  getMaxCheckInCloseDate,
  getStartDate,
  getDateFloorOffset,
}
