const countOfMembers = (occupancies) => {
  return (occupancies || []).reduce((acc, occupancy) => {
    return acc + occupancy.adults + (occupancy.children || 0) + (occupancy.infants || 0)
  }, 0) || 2
}

const getTaxTotal = ({ type, value, nights, perPerson, occupancies }) => {
  const members = perPerson ? countOfMembers(occupancies) : 1
  let total = value * members

  if (type === 'night') {
    total = total * nights
  }

  return total
}

/**
 * Calculate the taxes included into the total amount for an offer/order
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
 * @param {Array<TaxesAndFees>} params.taxesAndFees - The list of taxes
 * @param {number} params.nights - The number of nights
 * @param {Array<Occupants>} params.occupancies - The occupancies
 * @returns {number} Sum of taxes and fees
 */
const calculateTaxAmount = ({ total, taxesAndFees, nights, occupancies }) => {
  if (taxesAndFees && total) {
    // Group the taxes by unit
    const groupedTaxes = taxesAndFees.reduce((acc, tax) => {
      if (tax.unit === 'percentage') {
        acc.percentage.push(tax)
      } else {
        acc.amount.push(tax)
      }
      return acc
    }, { amount: [], percentage: [] })

    // Calculate the amount taxes
    const amountTaxes = groupedTaxes.amount.reduce((acc, tax) => {
      return acc + getTaxTotal({
        type: tax.type,
        value: tax.value,
        nights,
        perPerson: tax.per_person,
        occupancies,
      })
    }, 0)

    // Calculate the percentage taxes
    const totalExcludingAmountTaxes = total - amountTaxes
    const totalTaxPercentage = groupedTaxes.percentage.reduce((acc, tax) => {
      return acc + getTaxTotal({
        type: tax.type,
        value: tax.value,
        nights,
        perPerson: tax.per_person,
        occupancies,
      })
    }, 0)
    const percentageTaxes = totalExcludingAmountTaxes - (totalExcludingAmountTaxes / ((totalTaxPercentage / 100) + 1))

    // Sum the taxes
    return Math.floor(amountTaxes + percentageTaxes)
  }

  return 0
}

module.exports = {
  calculateTaxAmount,
}
