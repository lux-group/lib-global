"use strict";

var _excluded = ["percentage"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var countOfMembers = function countOfMembers(occupancies) {
  return (occupancies || []).reduce(function (acc, occupancy) {
    return acc + occupancy.adults + (occupancy.children || 0) + (occupancy.infants || 0);
  }, 0) || 2;
};

var getTaxTotal = function getTaxTotal(_ref) {
  var type = _ref.type,
      unit = _ref.unit,
      value = _ref.value,
      nights = _ref.nights,
      perPerson = _ref.perPerson,
      occupancies = _ref.occupancies;
  var members = perPerson ? countOfMembers(occupancies) : 1;
  var rooms = (occupancies || []).length || 1;
  var total = value * members;

  if (type !== 'stay' && unit !== 'percentage') {
    // Default to nightly tax
    total = total * nights;
  }

  if (!perPerson && unit !== 'percentage') {
    total = total * rooms;
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
 *   payable_at_property: boolean;
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
 * @returns {{taxesAndFees: number, propertyFees: number}} Sum of taxes and fees
 */


var calculateTaxAmount = function calculateTaxAmount(_ref2) {
  var total = _ref2.total,
      taxesAndFees = _ref2.taxesAndFees,
      nights = _ref2.nights,
      occupancies = _ref2.occupancies;
  var commonTaxesAndFees = [];
  var propertyTaxesAndFees = [];

  if (taxesAndFees && total) {
    taxesAndFees.forEach(function (tax) {
      if (!tax.payable_at_property) {
        commonTaxesAndFees.push(tax);
      } else {
        propertyTaxesAndFees.push(tax);
      }
    });

    var _calculateForEachAmou = _calculateForEachAmount({
      total: total,
      taxesAndFees: commonTaxesAndFees,
      nights: nights,
      occupancies: occupancies,
      percentageCalculationFormula: function percentageCalculationFormula(totalExcludingAmountTaxes, totalTaxPercentage) {
        return totalExcludingAmountTaxes - totalExcludingAmountTaxes / (totalTaxPercentage / 100 + 1);
      }
    }),
        commonTaxesAndFeesTotal = _calculateForEachAmou.taxesAndFeesTotal;

    var _calculateForEachAmou2 = _calculateForEachAmount({
      total: total - commonTaxesAndFeesTotal,
      taxesAndFees: propertyTaxesAndFees,
      nights: nights,
      occupancies: occupancies,
      percentageCalculationFormula: function percentageCalculationFormula(totalExcludingAmountTaxes, totalTaxPercentage) {
        return totalExcludingAmountTaxes / 100 * totalTaxPercentage;
      }
    }),
        propertyTaxesAndFeesTotal = _calculateForEachAmou2.taxesAndFeesTotal;

    return {
      taxesAndFees: commonTaxesAndFeesTotal,
      propertyFees: propertyTaxesAndFeesTotal
    };
  }

  return {
    taxesAndFees: 0,
    propertyFees: 0
  };
};
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


var _calculateForEachAmount = function _calculateForEachAmount(_ref3) {
  var total = _ref3.total,
      taxesAndFees = _ref3.taxesAndFees,
      nights = _ref3.nights,
      occupancies = _ref3.occupancies,
      percentageCalculationFormula = _ref3.percentageCalculationFormula;
  var taxesAndFeesWithTotalForEach = [];
  var percentageTaxesAndFees = []; // Group the taxes by unit

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
    var taxAmount = getTaxTotal({
      type: tax.type,
      unit: tax.unit,
      value: tax.value,
      nights: nights,
      perPerson: tax.per_person,
      occupancies: occupancies
    }); // Include total for each taxesAndFees

    taxesAndFeesWithTotalForEach.push(_objectSpread(_objectSpread({}, tax), {}, {
      total: taxAmount
    }));
    return acc + taxAmount;
  }, 0); // Calculate the percentage taxes

  var totalExcludingAmountTaxes = total - amountTaxes;
  var totalTaxPercentage = groupedTaxes.percentage.reduce(function (acc, tax) {
    var taxPercent = getTaxTotal({
      type: tax.type,
      unit: tax.unit,
      value: tax.value,
      nights: nights,
      perPerson: tax.per_person,
      occupancies: occupancies
    });
    percentageTaxesAndFees.push(_objectSpread(_objectSpread({}, tax), {}, {
      percentage: taxPercent
    }));
    return acc + taxPercent;
  }, 0);
  var percentageTaxes = percentageCalculationFormula(totalExcludingAmountTaxes, totalTaxPercentage); // Include taxesAndFees with total calculated for percentage taxesAndFees

  if (percentageTaxesAndFees.length > 0) {
    taxesAndFeesWithTotalForEach = [].concat(_toConsumableArray(taxesAndFeesWithTotalForEach), _toConsumableArray(percentageTaxesAndFees.map(function (_ref4) {
      var percentage = _ref4.percentage,
          taxDetails = _objectWithoutProperties(_ref4, _excluded);

      return _objectSpread(_objectSpread({}, taxDetails), {}, {
        total: percentageTaxes * (percentage / totalTaxPercentage)
      });
    })));
  }

  return {
    // Sum the taxes
    taxesAndFeesTotal: Math.floor(amountTaxes + percentageTaxes),
    // TaxesAndFees with total for each injected
    taxesAndFeesWithTotalForEach: taxesAndFeesWithTotalForEach
  };
};

var calculateAmountForEachTax = function calculateAmountForEachTax(_ref5) {
  var total = _ref5.total,
      taxesAndFees = _ref5.taxesAndFees,
      nights = _ref5.nights,
      occupancies = _ref5.occupancies;

  var _calculateForEachAmou3 = _calculateForEachAmount({
    total: total,
    taxesAndFees: taxesAndFees,
    nights: nights,
    occupancies: occupancies,
    percentageCalculationFormula: function percentageCalculationFormula(totalExcludingAmountTaxes, totalTaxPercentage) {
      return totalExcludingAmountTaxes - totalExcludingAmountTaxes / (totalTaxPercentage / 100 + 1);
    }
  }),
      taxesAndFeesWithTotalForEach = _calculateForEachAmou3.taxesAndFeesWithTotalForEach;

  return taxesAndFeesWithTotalForEach;
};

var calculateAmountForEachPropertyFee = function calculateAmountForEachPropertyFee(_ref6) {
  var total = _ref6.total,
      taxesAndFees = _ref6.taxesAndFees,
      nights = _ref6.nights,
      occupancies = _ref6.occupancies;

  var _calculateForEachAmou4 = _calculateForEachAmount({
    total: total,
    taxesAndFees: taxesAndFees,
    nights: nights,
    occupancies: occupancies,
    percentageCalculationFormula: function percentageCalculationFormula(totalExcludingAmountTaxes, totalTaxPercentage) {
      return totalExcludingAmountTaxes / 100 * totalTaxPercentage;
    }
  }),
      taxesAndFeesWithTotalForEach = _calculateForEachAmou4.taxesAndFeesWithTotalForEach;

  return taxesAndFeesWithTotalForEach;
};

module.exports = {
  calculateTaxAmount: calculateTaxAmount,
  calculateAmountForEachTax: calculateAmountForEachTax,
  calculateAmountForEachPropertyFee: calculateAmountForEachPropertyFee
};