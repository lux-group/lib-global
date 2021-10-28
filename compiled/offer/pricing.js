"use strict";

var countOfMembers = function countOfMembers(occupancies) {
  return (occupancies || []).reduce(function (acc, occupancy) {
    return acc + occupancy.adults + (occupancy.children || 0) + (occupancy.infants || 0);
  }, 0) || 2;
};

var perNight = function perNight(_ref) {
  var total = _ref.total,
      unit = _ref.unit,
      value = _ref.value,
      nights = _ref.nights,
      perPerson = _ref.perPerson,
      occupancies = _ref.occupancies;
  var members = perPerson ? countOfMembers(occupancies) : 1;

  if (unit === 'percentage') {
    return total / nights / 100 * value * members;
  } else {
    return value * nights * members;
  }
};

var perStay = function perStay(_ref2) {
  var total = _ref2.total,
      unit = _ref2.unit,
      value = _ref2.value,
      perPerson = _ref2.perPerson,
      occupancies = _ref2.occupancies;
  var members = perPerson ? countOfMembers(occupancies) : 1;

  if (unit === 'percentage') {
    return total / 100 * value * members;
  } else {
    return value * members;
  }
};
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


var calculateTaxAmount = function calculateTaxAmount(_ref3) {
  var total = _ref3.total,
      taxesAndFees = _ref3.taxesAndFees,
      nights = _ref3.nights,
      occupancies = _ref3.occupancies;

  if (taxesAndFees && total) {
    return Math.floor(taxesAndFees.reduce(function (acc, item) {
      var tax = 0;

      if (item.type === 'stay') {
        tax = perStay({
          total: total,
          unit: item.unit,
          value: item.value,
          perPerson: item.per_person,
          occupancies: occupancies
        });
      } else {
        tax = perNight({
          total: total,
          unit: item.unit,
          value: item.value,
          nights: nights,
          perPerson: item.per_person,
          occupancies: occupancies
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