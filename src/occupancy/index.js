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

const strummerMatcher = {
  match: (path, value) => {
    let dataCheck = value
    if (typeof value === 'string') {
      if (value.split(',').every(occupancy => !!occupancy.match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}?$/gi))) {
        dataCheck = [value.split(',')].flat()
      } else {
        dataCheck = [value]
      }
    } else if (typeof value === 'undefined') {
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

module.exports = {
  parse: parse,
  get: get,
  match: match,
  toString: toString,
  strummerMatcher: strummerMatcher,
}
