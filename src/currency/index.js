const dollarPrefixes = {
  AUD: 'A',
  CAD: 'CA',
  HKD: 'HK',
  MOP: 'MOP',
  NZD: 'NZ',
  SGD: 'S',
  TWD: 'NT',
  USD: 'US',
}

function addDollarType(formattedAmount, currencyCode) {
  if (formattedAmount.match(/^\$/)) {
    return `${dollarPrefixes[currencyCode] || ''}${formattedAmount}`
  }
  if (formattedAmount.match(/^\-\$/)) {
    return `-${dollarPrefixes[currencyCode] || ''}${formattedAmount.slice(1)}`
  }
  return formattedAmount
}

module.exports = {
  addDollarType: addDollarType,
}
