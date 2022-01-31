const moment = require('moment')

const CEILING_YEARS = 3
const DEFAULT_MONTHS_FALLBACK = 18
const DATE_FORMAT = 'YYYY-MM-DD'

const getMonthsToRequest = (maxDate) => {
  const now = moment()
  const diff = moment.duration(moment(maxDate).diff(now))

  if (isNaN(diff.months())) {
    return 1
  }

  return diff.months() + 1
}

const getMaxCheckInCloseDate = (
  checkInCloses,
  defaultMonths = DEFAULT_MONTHS_FALLBACK,
) => {
  return checkInCloses ?
    moment
      .min(moment(checkInCloses), moment().add(CEILING_YEARS, 'years'))
      .format(DATE_FORMAT) :
    moment().add(defaultMonths, 'months').format(DATE_FORMAT)
}

const getStartDate = (minDate, travelFromDate) => {
  if (minDate && travelFromDate) {
    if (moment(travelFromDate).isAfter(moment(minDate))) {
      return moment(travelFromDate).format(DATE_FORMAT)
    } else {
      return moment(minDate).format(DATE_FORMAT)
    }
  }
  if (travelFromDate) {
    return moment(travelFromDate).format(DATE_FORMAT)
  }
  return moment(minDate).format(DATE_FORMAT)
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
  getMonthsToRequest,
  getMaxCheckInCloseDate,
  getStartDate,
  getDateFloorOffset,
}
