const moment = require('moment')
const pluralize = require('pluralize')

const timeLeftMessage = (schedule, voucher) => {
  const SOLD_OUT_MSG = 'Sold out'
  const OFFER_NEW = 'New'
  const ENDING_SOON = 'Ending Soon'

  if (voucher && voucher.limit_reached === true) {
    return {
      type: 'sold',
      message: SOLD_OUT_MSG,
    }
  }

  const now = moment()
  const start = moment(schedule.start)
  const end = moment(schedule.end)

  const durationFromStart = moment.duration(now.diff(start))
  const leftToTheEnd = moment.duration(end.diff(now))

  const startHours = parseInt(durationFromStart.asHours())
  const endDays = parseInt(leftToTheEnd.asDays())
  const endHours = parseInt(leftToTheEnd.asHours())
  const endMinutes = parseInt(leftToTheEnd.asMinutes())

  if (startHours > 0 && startHours <= 72 && endMinutes > 0) {
    return {
      type: 'new',
      message: OFFER_NEW,
    }
  }

  if (startHours > 72 && endDays > 4 && endMinutes > 0) {
    return {
      type: 'ending_soon',
      message: ENDING_SOON,
    }
  }

  if (endHours > 24 && endDays <= 4 && endMinutes > 0) {
    return {
      type: 'left',
      message: `${pluralize('day', endDays, true)} left`,
    }
  }

  if (endMinutes > 60 && endHours <= 24) {
    return {
      type: 'left',
      message: `${pluralize('hour', endHours, true)} left`,
    }
  }

  if (endMinutes >= 0 && endMinutes <= 60) {
    return {
      type: 'left',
      message: `${pluralize('minute', endMinutes, true)} left`,
    }
  }

  return {
    type: 'sold',
    message: SOLD_OUT_MSG,
  }
}

module.exports = {
  timeLeftMessage: timeLeftMessage,
}
