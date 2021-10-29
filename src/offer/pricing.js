const countOfMembers = (occupancies) => {
  return (occupancies || []).reduce((acc, occupancy) => {
    return acc + occupancy.adults + (occupancy.children || 0) + (occupancy.infants || 0)
  }, 0) || 2
}

const perNight = ({ total, unit, value, nights, perPerson, occupancies }) => {
  const members = perPerson ? countOfMembers(occupancies) : 1

  if (unit === 'percentage') {
    return ((total / 100) * value) * members
  } else {
    return (value * nights) * members
  }
}

const perStay = ({ total, unit, value, perPerson, occupancies }) => {
  const members = perPerson ? countOfMembers(occupancies) : 1

  if (unit === 'percentage') {
    return ((total / 100) * value) * members
  } else {
    return value * members
  }
}

/**
 * Extract and validate the offer and offer package for an order
 *
 * interface TaxesAndFees {
 *   name: string;
 *   unit: "percentage" | "amount";
 *   type: "night" | "stay";
 *   per_person: boolean;
 *   value: number;
 * }
 *
 * interface Occupants {
 *   adults: number;
 *   children?: number;
 *   infants?: number;
 *   childrenAge?: Array<number>;
 * }
 *
 * @param {object} params - All params
 * @param {number} params.total - The total amount of booking period
 * @param {Array<TaxesAndFees>} params.taxesAndFees - The orders currency code
 * @param {number} params.nights - The number of nights
 * @param {Array<Occupants>} params.occupancies - The occupancies
 * @returns {number} Sum of taxes and fees
 */
const calculateTaxAmount = ({ total, taxesAndFees, nights, occupancies }) => {
  if (taxesAndFees && total) {
    return Math.floor(
      taxesAndFees.reduce((acc, item) => {
        let tax = 0

        if (item.type === 'stay') {
          tax = perStay({ total, unit: item.unit, value: item.value, perPerson: item.per_person, occupancies })
        } else {
          tax = perNight({ total, unit: item.unit, value: item.value, nights, perPerson: item.per_person, occupancies })
        }

        return acc + tax
      }, 0),
    )
  }

  return 0
}

module.exports = {
  calculateTaxAmount,
}
