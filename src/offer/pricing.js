const isEmpty = require('lodash')
const { PRODUCT_ALL, PRODUCT_DYNAMIC, PRODUCT_LTE } = require('../product/constants')

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
  const rooms = (occupancies || []).length || 1
  let total = value * members

  if (type !== 'stay' && unit !== 'percentage') {
    // Default to nightly tax
    total = total * nights
  }

  if (!perPerson && unit !== 'percentage') {
    total = total * rooms
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
 *   payable_at_property: boolean;
 *   excl_flash_at_property?: boolean;
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
 * @param {boolean} params.isFlash - Offer type is a flash/hotel type, defaults to false
 * @returns {{taxesAndFees: number, propertyFees: number}} Sum of taxes and fees
 */
const calculateTaxAmount = ({ total, taxesAndFees, nights, occupancies, isFlash = false }) => {
  const commonTaxesAndFees = []
  const propertyTaxesAndFees = []

  const _appendPropertyTaxesAndFees = (taxItem) => {
    if (!taxItem.payable_at_property || (taxItem.payable_at_property && isFlash && taxItem.excl_flash_at_property)) {
      commonTaxesAndFees.push(taxItem)
    } else {
      propertyTaxesAndFees.push(taxItem)
    }
  }

  if (taxesAndFees && total) {
    taxesAndFees.forEach((tax) => {
      if (tax.product_type === PRODUCT_DYNAMIC && !isFlash) {
        _appendPropertyTaxesAndFees(tax)
      } else if (tax.product_type === PRODUCT_LTE && isFlash) {
        _appendPropertyTaxesAndFees(tax)
      } else if (
        tax.product_type === PRODUCT_ALL ||
        isEmpty(tax.product_type)
      ) {
        // Include if product type is set to ALL or if product type is empty/missing
        _appendPropertyTaxesAndFees(tax)
      }
    })

    const { taxesAndFeesTotal: commonTaxesAndFeesTotal } =
      _calculateForEachAmount({
        total,
        taxesAndFees: commonTaxesAndFees,
        nights,
        occupancies,
        percentageCalculationFormula: function(
          totalExcludingAmountTaxes,
          totalTaxPercentage,
        ) {
          return (
            totalExcludingAmountTaxes -
            totalExcludingAmountTaxes / (totalTaxPercentage / 100 + 1)
          )
        },
      })

    const { taxesAndFeesTotal: propertyTaxesAndFeesTotal } =
      _calculateForEachAmount({
        total: total - commonTaxesAndFeesTotal,
        taxesAndFees: propertyTaxesAndFees,
        nights,
        occupancies,
        percentageCalculationFormula: function(
          totalExcludingAmountTaxes,
          totalTaxPercentage,
        ) {
          return (totalExcludingAmountTaxes / 100) * totalTaxPercentage
        },
      })

    return {
      taxesAndFees: commonTaxesAndFeesTotal,
      propertyFees: propertyTaxesAndFeesTotal,
    }
  }

  return { taxesAndFees: 0, propertyFees: 0 }
}

/**
 * Calculate the taxes total amount and inject total for 'Taxes & fees' tax
 *
 * @param {object} params - All params
 * @param {number} params.total - The total amount of booking period
 * @param {Array<TaxesAndFees>} params.taxesAndFees - The list of taxes
 * @param {number} params.nights - The number of nights
 * @param {Array<Occupants>} params.occupancies - The occupancies
 * @param {callback} params.percentageCalculationFormula - Formula of finding percentage
 * @returns Sum of taxes and fees (taxesAndFeesTotal) and taxesAndFees with total injected (taxesAndFeesWithTotalForEach)
 */
const _calculateForEachAmount = ({
  total,
  taxesAndFees,
  nights,
  occupancies,
  percentageCalculationFormula,
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
  const percentageTaxes = percentageCalculationFormula(
    totalExcludingAmountTaxes,
    totalTaxPercentage,
  )

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

const calculateAmountForEachTax = ({
  total,
  taxesAndFees,
  nights,
  occupancies,
}) => {
  const { taxesAndFeesWithTotalForEach } = _calculateForEachAmount({
    total,
    taxesAndFees,
    nights,
    occupancies,
    percentageCalculationFormula: function(
      totalExcludingAmountTaxes,
      totalTaxPercentage,
    ) {
      return (
        totalExcludingAmountTaxes -
        totalExcludingAmountTaxes / (totalTaxPercentage / 100 + 1)
      )
    },
  })

  return taxesAndFeesWithTotalForEach
}

const calculateAmountForEachPropertyFee = ({
  total,
  taxesAndFees,
  nights,
  occupancies,
}) => {
  const { taxesAndFeesWithTotalForEach } = _calculateForEachAmount({
    total,
    taxesAndFees,
    nights,
    occupancies,
    percentageCalculationFormula: function(
      totalExcludingAmountTaxes,
      totalTaxPercentage,
    ) {
      return (totalExcludingAmountTaxes / 100) * totalTaxPercentage
    },
  })

  return taxesAndFeesWithTotalForEach
}

const calculateTaxBreakdownForEachTax = ({
  total,
  taxesAndFees,
  nights,
  occupancies,
}) => {
  const { taxesAndFeesWithTotalForEach } = _calculateForEachAmount({
    total,
    taxesAndFees,
    nights,
    occupancies,
    percentageCalculationFormula: function(
      totalExcludingAmountTaxes,
      totalTaxPercentage,
    ) {
      return (
        totalExcludingAmountTaxes -
        totalExcludingAmountTaxes / (totalTaxPercentage / 100 + 1)
      )
    },
  })

  const breakdown = []
  taxesAndFeesWithTotalForEach.forEach((tax) => {
    breakdown.push({
      name: tax.name,
      dynamic_tax: false,
      unit: tax.unit || 'amount',
      additional_tax: tax.additional_tax || false,
      duration_type: tax.type || 'night',
      value: tax.value,
      currency: tax.currency,
      per_person: tax.per_person || false,
      sell: Math.floor(tax.total) || 0,
      sell_currency: tax.sell_currency || 'AUD',
    })
  })
  return breakdown
}

module.exports = {
  calculateTaxAmount,
  calculateAmountForEachTax,
  calculateAmountForEachPropertyFee,
  calculateTaxBreakdownForEachTax,
}
