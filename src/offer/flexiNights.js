/**
 * Calculates the duration based on number of nights/days and extra nights
 *
 * @param {*} offerPackageDuration, total number of nights/days for a given package
 * @param {*} extraNights, number of extra nights
 * @returns the duration of the package option
 */
const calculateDuration = (offerPackageDuration, extraNights) => {
  return offerPackageDuration + extraNights
}

/**
 * Calculates the prices based on number of nights and the package prices list
 *
 * @param {*} offerPackagePrices, list of prices of the package
 * @param {*} extraNights, number of extra nights
 * @returns a list of prices based on prices in the package and number of nights
 */
const calculatePackagePrices = (offerPackagePrices, extraNights) => {
  return offerPackagePrices.map((price) => {
    const packagePrice = (extraNights && extraNights > 0) ? price.price + extraNights * price.nightly_price : price.price
    const packageValue = (extraNights && extraNights > 0) ? price.value + extraNights * price.nightly_value : price.value
    return {
      ...price,
      price: packagePrice,
      value: packageValue,
      nightly_price: price.nightly_price,
      nightly_value: price.nightly_value,
    }
  })
}

/**
 * Generates a package option
 *
 * @param {*} packageOption, a package option of a package in an offer
 * @param {*} offerPackage, a package of an offer
 * @param {*} extraNights, number of extra nights
 * @returns Generates a package option
 */
const generatePackageOption = (packageOption, offerPackage, extraNights) => {
  const offerPackageDuration = offerPackage.number_of_nights || offerPackage.number_of_days
  const offerPackagePrices = (offerPackage.prices) ? offerPackage.prices : []

  return {
    packageId: packageOption.id || offerPackage.id,
    extraNights: extraNights,
    roomTypeId: offerPackage.fk_room_type_id || undefined,
    roomRateId: packageOption.fk_room_rate_id || offerPackage.fk_room_rate_id || undefined,
    name: packageOption.name || offerPackage.name,
    duration: calculateDuration(offerPackageDuration, extraNights),
    prices: calculatePackagePrices(offerPackagePrices, extraNights),
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
 * Add the flexible nights package options
 *
 * @param {*} offerPackage, a package of an offer
 * @param {*} packageOption, a package option of a package in an offer
 * @returns a list of flexible nights package options
 */
const generateFlexiNightsPackageOptions = (offerPackage, packageOption) => {
  const result = []
  for (
    let extraNights = 1;
    extraNights <= offerPackage.max_extra_nights;
    extraNights++
  ) {
    result.push(generatePackageOption(packageOption, offerPackage, extraNights))
  }
  return result
}

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

  packageOptions.forEach(packageOption => {
    result.push(generatePackageOption(packageOption, offerPackage, 0))
    if (offerPackage.flexible_nights && offerPackage.max_extra_nights) {
      result.push(...generateFlexiNightsPackageOptions(offerPackage, packageOption))
    }
  })

  return result
}

module.exports = {
  calculateDuration,
  generatePackageOption,
  calculatePackagePrices,
  generateAllPackageOptions,
  generateFlexiNightsPackageOptions,
}
