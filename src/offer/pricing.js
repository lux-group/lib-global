const countOfMembers = (occupancies) => {
  return (
    (occupancies || []).reduce((acc, occupancy) => {
      return (
        acc +
        occupancy.adults +
        (occupancy.children || 0) +
        (occupancy.infants || 0)
      )
    }, 0) || 2
  )
}

const getTaxTotal = ({ type, unit, value, nights, perPerson, occupancies }) => {
  const members = perPerson ? countOfMembers(occupancies) : 1
  let total = value * members

  if (type !== 'stay' && unit !== 'percentage') {
    // Default to nightly tax
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
    const { taxesAndFeesTotal } = calculateAmountForEachTax({
      total,
      taxesAndFees,
      nights,
      occupancies,
    })

    return taxesAndFeesTotal
  }

  return 0
}

/**
 * Calculate the taxes total amount and inject total of each tax
 *
 * @param {object} params - All params
 * @param {number} params.total - The total amount of booking period
 * @param {Array<TaxesAndFees>} params.taxesAndFees - The list of taxes
 * @param {number} params.nights - The number of nights
 * @param {Array<Occupants>} params.occupancies - The occupancies
 * @returns Sum of taxes and fees (taxesAndFeesTotal) and taxesAndFees with total injected (taxesAndFeesWithTotalForEach)
 */
const calculateAmountForEachTax = ({
  total,
  taxesAndFees,
  nights,
  occupancies,
}) => {
  let taxesAndFeesWithTotalForEach = []
  const percentageTaxesAndFees = []
  // Group the taxes by unit
  const groupedTaxes = taxesAndFees.reduce(
    (acc, tax) => {
      if (tax.unit === 'percentage') {
        acc.percentage.push(tax)
      } else {
        acc.amount.push(tax)
      }
      return acc
    },
    { amount: [], percentage: [] },
  )

  // Calculate the amount taxes
  const amountTaxes = groupedTaxes.amount.reduce((acc, tax) => {
    const taxAmount = getTaxTotal({
      type: tax.type,
      unit: tax.unit,
      value: tax.value,
      nights,
      perPerson: tax.per_person,
      occupancies,
    })

    // Include total for each taxesAndFees
    taxesAndFeesWithTotalForEach.push({ ...tax, total: taxAmount })
    return acc + taxAmount
  }, 0)

  // Calculate the percentage taxes
  const totalExcludingAmountTaxes = total - amountTaxes
  const totalTaxPercentage = groupedTaxes.percentage.reduce((acc, tax) => {
    const taxPercent = getTaxTotal({
      type: tax.type,
      unit: tax.unit,
      value: tax.value,
      nights,
      perPerson: tax.per_person,
      occupancies,
    })
    percentageTaxesAndFees.push({ ...tax, percentage: taxPercent })
    return acc + taxPercent
  }, 0)
  const percentageTaxes =
    totalExcludingAmountTaxes -
    totalExcludingAmountTaxes / (totalTaxPercentage / 100 + 1)

  // Include taxesAndFees with total calculated for percentage taxesAndFees
  if (percentageTaxesAndFees.length > 0) {
    taxesAndFeesWithTotalForEach = [
      ...taxesAndFeesWithTotalForEach,
      ...percentageTaxesAndFees.map(({ percentage, ...taxDetails }) => ({
        ...taxDetails,
        total: percentageTaxes * (percentage / totalTaxPercentage),
      })),
    ]
  }

  return {
    // Sum the taxes
    taxesAndFeesTotal: Math.floor(amountTaxes + percentageTaxes),
    // TaxesAndFees with total for each injected
    taxesAndFeesWithTotalForEach,
  }
}

module.exports = {
  calculateTaxAmount,
  calculateAmountForEachTax,
}
