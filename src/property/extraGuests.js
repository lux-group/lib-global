const { isUndefined } = require('lodash')

function floatify(value) {
  return parseFloat(parseFloat(value).toFixed(2))
}

function get({ adults, children, infants, teenagers = 0, includedGuests }) {
  if (!adults && !children && !infants && !teenagers) {
    return []
  }

  // If there are no included guests that means we have no extra guest surcharge
  if (!includedGuests.length) {
    return []
  }

  const normalizedIncludedGuests = includedGuests.map((included) => ({
    adults: included.adults || 0,
    children: included.children || 0,
    infants: included.infants || 0,
    teenagers: included.teenagers || 0,
  }))

  const validIncludedGuests = normalizedIncludedGuests.filter(
    (included) =>
      adults <= included.adults &&
      children <= included.children &&
      infants <= included.infants &&
      teenagers <= included.teenagers,
  )
  if (validIncludedGuests.length) {
    return []
  }

  return normalizedIncludedGuests.map((included) => ({
    adults: Math.max(adults - included.adults, 0),
    children: Math.max(children - included.children, 0),
    infants: Math.max(infants - included.infants, 0),
    teenagers: Math.max(teenagers - included.teenagers, 0),
  }))
}

function surcharges({
  nights,
  extraGuests,
  extraGuestSurcharge,
}) {
  const hasExtraGuests = extraGuests.flat().length > 0
  if (!hasExtraGuests || isUndefined(extraGuestSurcharge)) {
    return {
      sell: 0,
      cost: 0,
      applies: false,
      costCurrency: undefined,
      duration: {
        sell: 0,
        cost: 0,
        applies: false,
      },
    }
  }

  const lowest = {
    sell: 0,
    cost: 0,
  }

  for (const roomExtraGuests of extraGuests) {
    let roomLowest = null
    for (const extra of roomExtraGuests) {
      const perNightAmounts = {
        sell: 0,
        cost: 0,
      }

      if (extra.adults) {
        perNightAmounts.sell += extra.adults * extraGuestSurcharge.adult_amount
        if (!isUndefined(extraGuestSurcharge.adult_cost)) {
          perNightAmounts.cost += extra.adults * extraGuestSurcharge.adult_cost
        }
      }
      if (extra.children) {
        perNightAmounts.sell += extra.children * extraGuestSurcharge.child_amount
        if (!isUndefined(extraGuestSurcharge.child_cost)) {
          perNightAmounts.cost += extra.children * extraGuestSurcharge.child_cost
        }
      }
      if (extra.infants) {
        perNightAmounts.sell += extra.infants * extraGuestSurcharge.infant_amount
        if (!isUndefined(extraGuestSurcharge.infant_cost)) {
          perNightAmounts.cost += extra.infants * extraGuestSurcharge.infant_cost
        }
      }

      if (extra.teenagers && 'teenager_amount' in extraGuestSurcharge) {
        perNightAmounts.sell += extra.teenagers * extraGuestSurcharge.teenager_amount
        if (!isUndefined(extraGuestSurcharge.teenager_cost)) {
          perNightAmounts.cost += extra.teenagers * extraGuestSurcharge.teenager_cost
        }
      }

      if (
        perNightAmounts.sell > 0 &&
        (!roomLowest || perNightAmounts.sell < roomLowest.sell)
      ) {
        roomLowest = perNightAmounts
      }
    }

    if (roomLowest) {
      lowest.sell = lowest.sell + roomLowest.sell
      lowest.cost = lowest.cost + roomLowest.cost
    }
  }

  const durationAmounts = {
    cost: nights * lowest.cost,
    sell: nights * lowest.sell,
  }

  return {
    sell: Math.floor(lowest.sell),
    cost: floatify(lowest.cost),
    applies: true,
    costCurrency: extraGuestSurcharge.currency,
    duration: {
      sell: Math.floor(durationAmounts.sell),
      cost: floatify(durationAmounts.cost),
      applies: true,
    },
  }
}

module.exports = {
  get,
  surcharges,
}
