/**
 * Generates the JSON format for a package option
 *
 * @param {*} packageOption, a package of an offer
 * @param {*} numberOfNights, number of nights
 * @param {*} extraNights, number of extra nights
 * @returns JSON format of a package option
 */
const generatePackageOption = (packageOption, numberOfNights, extraNights) => {
  return {
    packageId: packageOption.fk_room_rate_id,
    extraNights: extraNights,
    roomRateId: packageOption.fk_room_rate_id,
    name: packageOption.name || undefined,
    duration: numberOfNights + extraNights,
  }
}

/**
 * Gets the package_options in the package if exists or if not the room rate id
 *
 * @param {*} offerPackage, a package of an offer
 * @returns package_options in the package if exists and if not the room rate id
 */
const getPackageOptions = (offerPackage) => (
  (offerPackage.package_options && offerPackage.package_options.length > 0) ?
    offerPackage.package_options :
    [{ fk_room_rate_id: offerPackage.fk_room_rate_id }])

/**
 * Generates a list of all the package options, adding new options for flexible nights
 *
 * @param {*} offerPackage, a package of an offer
 * @returns a list of all the package options
 */
const generateAllPackageOptions = (offerPackage) => {
  const result = []
  if (!offerPackage) return result

  const packageOptions = getPackageOptions(offerPackage)

  const maxExtraNights =
    (offerPackage.flexible_nights && offerPackage.max_extra_nights) ?
      offerPackage.max_extra_nights : 0

  for (
    let extraNights = 0;
    extraNights <= maxExtraNights;
    extraNights++
  ) {
    packageOptions.forEach(packageOption => {
      result.push(generatePackageOption(packageOption, offerPackage.number_of_nights, extraNights))
    })
  }
  return result
}

/**
 * Calculates the prices based on number of nights and the package prices list
 *
 * @param {*} offerPackagePrices, list of prices of the package
 * @param {*} duration, number of nights
 * @returns a list of prices based on prices in the package and number of nights
 */
const calculatePackagePrices = (offerPackagePrices, duration) => {
  return offerPackagePrices.map((price) => {
    return {
      ...price,
      price: price.price + duration * price.nightly_price,
      value: price.value + duration * price.nightly_value,
      nightly_price: 0,
      nightly_value: 0,
    }
  })
}

/**
 * Generates a list of all the package options with their prices,
 * adding new options for flexible nights
 *
 * @param {*} offerPackage, a package of an offer
 * @returns a list of all the package options with their prices
 */
const generateAllPackageOptionsWithPrices = (offerPackage) => {
  const offerPackagePrices = (offerPackage.prices) ? [...offerPackage.prices] : undefined

  const allPackageOptions = generateAllPackageOptions(offerPackage)
  const result = allPackageOptions.map((packageOption) => {
    return {
      ...packageOption,
      prices: (offerPackagePrices) ?
        calculatePackagePrices(offerPackagePrices, packageOption.duration) :
        undefined,
    }
  })
  return result
}

module.exports = {
  generatePackageOption,
  calculatePackagePrices,
  generateAllPackageOptions,
  generateAllPackageOptionsWithPrices,
}
