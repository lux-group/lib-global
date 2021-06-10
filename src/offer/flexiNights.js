/**
 * Generate the id of the package option
 *
 * @param {*} packageOption, a package of an offer
 * @param {*} duration, number of nights
 * @returns the id of the package option
 */
const getPackageOptionId = (packageOption, duration) => {
  let packageOptionsId = (packageOption.id) ?
    packageOption.id : packageOption.fk_room_rate_id

  return `${packageOptionsId}++${duration}`
}

/**
 * Generates the JSON format for a package duration
 *
 * @param {*} packageOption, a package of an offer
 * @param {*} duration, number of nights
 * @param {*} packagePrices, the list of prices in the package
 * @returns JSON format of a package duration
 */
const getPackageDuration = (packageOption, duration, packagePrices) => {
  const result = {
    packageId: packageOption.fk_room_rate_id,
    packageOptionsId: getPackageOptionId(packageOption, duration),
    roomRateId: packageOption.fk_room_rate_id,
    name: packageOption.name || undefined,
    duration,
  }
  return (packagePrices) ? {...result, prices: calculatePackageRates(packagePrices, duration)} : result
}

/**
 * Gets the package_options if exists or if not the room rate id
 *
 * @param {*} offerPackage, a package of an offer
 * @returns package_options if exists and if not the room rate id
 */
const getPakcageOptions = (offerPackage) => (
  (offerPackage.package_options && offerPackage.package_options.length > 0) ?
    offerPackage.package_options :
    [{ fk_room_rate_id: offerPackage.fk_room_rate_id }])

/**
 * Generates a list of package options, adding new options for flexible nights
 *
 * @param {*} offerPackage, a package of an offer
 * @param {*} addPrices, boolean that indicates if list of prices will
 * be included for each package options
 * @returns a list of package options
 */
const generatePackageDurations = (offerPackage, addPrices = undefined) => {
  const result = []
  if (!offerPackage) return result

  const packageOptions = getPakcageOptions(offerPackage)
  const packagePrices = (addPrices) ? [...offerPackage.prices] : undefined

  const maxExtraNights =
    (offerPackage.flexible_nights && offerPackage.max_extra_nights) ?
      offerPackage.max_extra_nights : 0

  for (
    let extraNights = 0;
    extraNights <= maxExtraNights;
    extraNights++
  ) {
    const duration = offerPackage.number_of_nights + extraNights
    packageOptions.forEach(packageOption => {
      result.push(getPackageDuration(packageOption, duration, packagePrices))
    })
  }
  return result
}

/**
 * Calculates the rates from number of nights and the package prices list
 *
 * @param {*} offerPackagePrices, list of prices of the package
 * @param {*} duration, number of nights
 * @returns a list of prices based on pakcage prices and number of nights
 */
const calculatePackageRates = (offerPackagePrices, duration) => {
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

module.exports = {
  getPackageDuration,
  generatePackageDurations,
  calculatePackageRates,
}
