"use strict";

var dollarPrefixes = {
  AUD: 'A',
  CAD: 'CA',
  HKD: 'HK',
  MOP: 'MOP',
  NZD: 'NZ',
  SGD: 'S',
  TWD: 'NT',
  USD: 'US'
};

function addDollarType(formattedAmount, currencyCode) {
  if (formattedAmount.match(/^\$/)) {
    return "".concat(dollarPrefixes[currencyCode] || '').concat(formattedAmount);
  }

  if (formattedAmount.match(/^\-\$/)) {
    return "-".concat(dollarPrefixes[currencyCode] || '').concat(formattedAmount.slice(1));
  }

  return formattedAmount;
}

module.exports = {
  addDollarType: addDollarType
};