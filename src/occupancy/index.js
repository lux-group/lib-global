const { isInteger } = require('lodash')

const match = occupancy => !(occupancy.match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}?$/gi) == null) ||
  !(occupancy.match(/^[0-9]{1,2}(-[0-9]{1,2}?(,[0-9]{1,2})*)?$/ig) == null)

const parse = (occupancy) => {
  if (occupancy.match(/^[0-9]{1,2}(-[0-9]{1,2}?(,[0-9]{1,2})*)?$/ig)) {
    const [adults, ages] = occupancy.split('-')
    let children = 0
    let childrenAges = []

    if (ages) {
      childrenAges = ages.split(',').map(x => Number(x))
      children = childrenAges.length
    }

    return {
      adults: Number(adults),
      children: Number(children),
      teenagers: 0,
      infants: 0,
      childrenAges,
    }
  } else {
    const [adults, children, infants, teenagers] = occupancy.split('-')

    return {
      adults: Number(adults),
      children: Number(children),
      infants: Number(infants),
      teenagers: Number(teenagers) || 0,
      childrenAges: [],
    }
  }
}

const toString = occupancy => {
  if (occupancy.childrenAges && occupancy.childrenAges.length) {
    return `${occupancy.adults}-${occupancy.childrenAges.join(',')}`
  } else {
    return `${occupancy.adults}-${occupancy.children}-${occupancy.infants}`
  }
}

const get = occupancy => {
  let occupancies = []

  if (typeof occupancy === 'string') {
    if (occupancy.split(',').every(occupancy => !!occupancy.match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}?$/gi))) {
      occupancies = occupancy.split(',').map(parse)
    } else {
      occupancies = [occupancy].map(parse)
    }
  } else {
    occupancies = occupancy.map(parse)
  }

  return occupancies
}

const getStrummerMatcher = (required = false) => {
  return {
    match: (path, value) => {
      let dataCheck = value

      if (typeof value === 'number') {
        dataCheck = value.toString()
      }

      if (typeof dataCheck === 'string' && dataCheck) {
        if (dataCheck.split(',').every(occupancy => !!occupancy.match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}?$/gi))) {
          dataCheck = [dataCheck.split(',')].flat()
        } else {
          dataCheck = [dataCheck]
        }
      } else if (typeof value === 'undefined' || !value) {
        if (required === true) {
          return 'Occupancy is required'
        }
        dataCheck = []
      }
      for (const occupancy of dataCheck) {
        if (!match(occupancy)) {
          return 'Invalid occupancy format'
        }
      }
    },
    toJSONSchema: () => ({ type: 'string', properties: {} }),
  }
}

function countOccupants({ occupancy, maxChildAge, maxInfantAge, maxTeenagerAge }) {
  let childrenAges = occupancy.childrenAges || []
  if (!childrenAges.length) {
    return {
      adults: occupancy.adults,
      children: occupancy.children,
      infants: occupancy.infants,
      teenagers: occupancy.teenagers || 0,
      childrenAges: [],
    }
  } else {
    let adults = occupancy.adults
    let children = childrenAges.length
    let teenagers = 0

    if (isInteger(maxTeenagerAge) && maxTeenagerAge > 0 &&
      isInteger(maxChildAge) && maxChildAge > 0 &&
      children > 0) {
      const teenAges = childrenAges.filter(
        (age) => age > maxChildAge && age <= maxTeenagerAge,
      )
      teenagers = teenAges.length
    }

    if (isInteger(maxChildAge) && maxChildAge > 0 && children > 0) {
      const filteredChildrenAges = childrenAges.filter(
        (age) => age <= maxChildAge,
      )
      children = filteredChildrenAges.length

      if (isInteger(maxTeenagerAge) && maxTeenagerAge > 0) {
        const adultAges = childrenAges.filter(
          (age) => age > maxTeenagerAge,
        )
        adults = adults + adultAges.length
      } else {
        adults = adults + childrenAges.length - children - teenagers
      }
      childrenAges = filteredChildrenAges
    }

    let infants = 0
    if (isInteger(maxInfantAge) && children > 0) {
      infants = childrenAges.filter((age) => age <= maxInfantAge).length
      children = children - infants
    }

    return {
      adults: adults,
      children: children,
      infants: infants,
      teenagers: teenagers,
      childrenAges: childrenAges,
    }
  }
}

module.exports = {
  parse: parse,
  get: get,
  match: match,
  toString: toString,
  countOccupants: countOccupants,
  strummerMatcher: getStrummerMatcher(),
  strummerMatcherRequired: getStrummerMatcher(true),
}
