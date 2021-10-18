const calculateTaxAmount = ({ price, taxesAndFees, numberOfNights }) => {
  if (taxesAndFees && price) {
    return Math.floor(
      taxesAndFees.reduce((acc, item) => {
        let tax = 0
        if (item.unit === 'percentage') {
          tax = (price / 100) * item.value
        } else {
          tax = item.value * numberOfNights
        }

        return acc + tax
      }, 0),
    )
  }

  return 0
}

module.exports = {
  calculateTaxAmount,
}
