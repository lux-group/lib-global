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
      infants: 0,
      childrenAges,
    }
  } else {
    const [adults, children, infants] = occupancy.split('-')

    return {
      adults: Number(adults),
      children: Number(children),
      infants: Number(infants),
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
      if (typeof value === 'string' && value) {
        if (value.split(',').every(occupancy => !!occupancy.match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}?$/gi))) {
          dataCheck = [value.split(',')].flat()
        } else {
          dataCheck = [value]
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

function countOccupants({ occupancy, maxChildAge, maxInfantAge }) {
  let childrenAges = occupancy.childrenAges || []
  if (!childrenAges.length) {
    return {
      adults: occupancy.adults,
      children: occupancy.children,
      infants: occupancy.infants,
      childrenAges: [],
    }
  } else {
    let adults = occupancy.adults
    let children = childrenAges.length
    if (isInteger(maxChildAge) && maxChildAge > 0 && children > 0) {
      const filteredChildrenAges = childrenAges.filter(
        (age) => age <= maxChildAge,
      )
      children = filteredChildrenAges.length
      adults = adults + childrenAges.length - children
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
