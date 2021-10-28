"use strict";

var perNight = function perNight(_ref) {
  var total = _ref.total,
      unit = _ref.unit,
      value = _ref.value,
      nights = _ref.nights;

  if (unit === 'percentage') {
    return total / nights / 100 * value;
  } else {
    return value * nights;
  }
};

var perStay = function perStay(_ref2) {
  var total = _ref2.total,
      unit = _ref2.unit,
      value = _ref2.value;

  if (unit === 'percentage') {
    return total / 100 * value;
  } else {
    return value;
  }
};

var perPerson = function perPerson(_ref3) {
  var total = _ref3.total,
      unit = _ref3.unit,
      value = _ref3.value,
      occupancies = _ref3.occupancies;
  var members = (occupancies || []).reduce(function (acc, occupancy) {
    return acc + occupancy.adults + (occupancy.children || 0) + (occupancy.infants || 0);
  }, 0) || 2;

  if (unit === 'percentage') {
    return members * (total / 100 * value);
  } else {
    return members * value;
  }
};
/**
 * Extract and validate the offer and offer package for an order
 *
 * interface TaxesAndFees {
 *   name: string;
 *   unit: "percentage" | "amount";
 *   type: "night" | "stay" | "person";
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


var calculateTaxAmount = function calculateTaxAmount(_ref4) {
  var total = _ref4.total,
      taxesAndFees = _ref4.taxesAndFees,
      nights = _ref4.nights,
      occupancies = _ref4.occupancies;

  if (taxesAndFees && total) {
    return Math.floor(taxesAndFees.reduce(function (acc, item) {
      var tax = 0;

      if (item.type === 'stay') {
        tax = perStay({
          total: total,
          unit: item.unit,
          value: item.value
        });
      } else if (item.type === 'person') {
        tax = perPerson({
          total: total,
          unit: item.unit,
          value: item.value,
          occupancies: occupancies
        });
      } else {
        tax = perNight({
          total: total,
          unit: item.unit,
          value: item.value,
          nights: nights
        });
      }

      return acc + tax;
    }, 0));
  }

  return 0;
};

module.exports = {
  calculateTaxAmount: calculateTaxAmount
};