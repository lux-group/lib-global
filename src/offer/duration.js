const dayOrNights = {
  hotel: {
    singular: 'Night',
    plural: 'Nights',
    field: 'number_of_nights',
  },
  tour: {
    singular: 'Day',
    plural: 'Days',
    field: 'number_of_days',
  },
}

const getCounts = (packages, field) => {
  return packages
    .reduce((acc, offerPackage) => {
      const duration = parseInt(offerPackage[field])
      if (!acc.includes(duration)) {
        acc.push(duration)
      }
      return acc
    }, [])
    .sort((a, b) => a - b)
}

const getCountsString = (packages, field) => {
  const durationCounts = getCounts(packages, field)

  if (durationCounts.length === 1) {
    return `${durationCounts[0]}`
  }

  return `${durationCounts.slice(0, -1).join(', ')} or ${
    durationCounts.slice(-1)[0]
  }`
}

const getFromPackages = (packages, offerType, holidayTypes) => {
  let dayOrNightsData = dayOrNights[offerType]

  if (holidayTypes) {
    // Block for holidayTypes
  }

  const { singular, plural, field } = dayOrNightsData
  const durationCounts = getCounts(packages, field)
  const durationString = getCountsString(packages, field)

  if (durationCounts.length === 1 && durationCounts[0] === 1) {
    return `${durationString} ${singular}`
  }

  return `${durationString} ${plural}`
}

module.exports = {
  getCounts,
  getCountsString,
  getFromPackages,
}
