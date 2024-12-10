const moment = require('moment')
const {
  OFFER_TYPE_LAST_MINUTE_HOTEL,
  LAST_MINUTE_CHECK_IN_LIMIT_DEFAULT,
} = require('./constants')

const format = (date) => date.format('YYYY-MM-DD')

const getMaxDate = (travelToDate, numberOfNights) => {
  return moment(travelToDate)
    .subtract(1, 'days')
    .subtract(numberOfNights, 'days')
}

const checkInClosesFlash = (travelToDate, numberOfNights) => {
  if (!travelToDate || !numberOfNights) {
    return null
  }

  return format(getMaxDate(travelToDate, numberOfNights))
}

const checkInClosesLastMinute = (
  travelToDate,
  numberOfNights,
  timezoneOffset = 0,
  checkInLimit = LAST_MINUTE_CHECK_IN_LIMIT_DEFAULT,
) => {
  let addDays = checkInLimit

  const nowDate = moment.utc().utcOffset(timezoneOffset)

  const nowHours = parseInt(nowDate.format('HH'))
  if (nowHours < 15) {
    addDays = addDays - 1
  }

  const checkInCloses = nowDate.add(addDays, 'days')

  if (!travelToDate || !numberOfNights) {
    return format(checkInCloses)
  }

  if (checkInCloses.isBefore(travelToDate)) {
    return format(checkInCloses)
  }

  return format(getMaxDate(travelToDate, numberOfNights))
}

const checkInCloses = (
  offerType,
  travelToDate,
  numberOfNights,
  timezoneOffset,
  checkInLimit,
) => {
  if (offerType === OFFER_TYPE_LAST_MINUTE_HOTEL) {
    return checkInClosesLastMinute(
      travelToDate,
      numberOfNights,
      timezoneOffset,
      checkInLimit,
    )
  }

  return checkInClosesFlash(travelToDate, numberOfNights)
}

module.exports = {
  checkInCloses,
}
