"use strict";

var countOfMembers = function countOfMembers(occupancies) {
  return (occupancies || []).reduce(function (acc, occupancy) {
    return acc + occupancy.adults + (occupancy.children || 0) + (occupancy.infants || 0);
  }, 0) || 2;
};

var getTaxTotal = function getTaxTotal(_ref) {
  var type = _ref.type,
      value = _ref.value,
      nights = _ref.nights,
      perPerson = _ref.perPerson,
      occupancies = _ref.occupancies;
  var members = perPerson ? countOfMembers(occupancies) : 1;
  var total = value * members;

  if (type !== 'stay') {
    // Default to nightly tax
    total = total * nights;
  }

  return total;
};
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


var calculateTaxAmount = function calculateTaxAmount(_ref2) {
  var total = _ref2.total,
      taxesAndFees = _ref2.taxesAndFees,
      nights = _ref2.nights,
      occupancies = _ref2.occupancies;

  if (taxesAndFees && total) {
    // Group the taxes by unit
    var groupedTaxes = taxesAndFees.reduce(function (acc, tax) {
      if (tax.unit === 'percentage') {
        acc.percentage.push(tax);
      } else {
        acc.amount.push(tax);
      }

      return acc;
    }, {
      amount: [],
      percentage: []
    }); // Calculate the amount taxes

    var amountTaxes = groupedTaxes.amount.reduce(function (acc, tax) {
      return acc + getTaxTotal({
        type: tax.type,
        value: tax.value,
        nights: nights,
        perPerson: tax.per_person,
        occupancies: occupancies
      });
    }, 0); // Calculate the percentage taxes

    var totalExcludingAmountTaxes = total - amountTaxes;
    var totalTaxPercentage = groupedTaxes.percentage.reduce(function (acc, tax) {
      return acc + getTaxTotal({
        type: tax.type,
        value: tax.value,
        nights: nights,
        perPerson: tax.per_person,
        occupancies: occupancies
      });
    }, 0);
    var percentageTaxes = totalExcludingAmountTaxes - totalExcludingAmountTaxes / (totalTaxPercentage / 100 + 1); // Sum the taxes

    return Math.floor(amountTaxes + percentageTaxes);
  }

  return 0;
};

module.exports = {
  calculateTaxAmount: calculateTaxAmount
};