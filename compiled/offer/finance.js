"use strict";

var calculateTaxAmount = function calculateTaxAmount(_ref) {
  var price = _ref.price,
      taxesAndFees = _ref.taxesAndFees,
      numberOfNights = _ref.numberOfNights;

  if (taxesAndFees && price) {
    return Math.floor(taxesAndFees.reduce(function (acc, item) {
      var tax = 0;

      if (item.unit === "percentage") {
        tax = price / 100 * item.value;
      } else {
        tax = item.value * numberOfNights;
      }

      return acc + tax;
    }, 0));
  }

  return 0;
};

module.exports = {
  calculateTaxAmount: calculateTaxAmount
};