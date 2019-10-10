const dollarPrefixes = {
  'AUD': 'A',
  'CAD': 'CA',
  'HKD': 'HK',
  'MOP': 'MOP',
  'NZD': 'NZ',
  'SGD': 'S',
  'TWD': 'NT',
  'USD': 'US',
}

function addDollarType(formattedAmount, currencyCode) {
  return formattedAmount.match(/^\$/) ?
    `${dollarPrefixes[currencyCode] || ''}${formattedAmount}` :
    formattedAmount
}

module.exports = {
  addDollarType: addDollarType,
}
