/**
 * Calculates the prices based on number of nights and the package prices list
 *
 * @param {*} offerPackagePrices list of prices of the package
 * @param {*} extraNights number of extra nights
 * @returns a list of prices based on prices in the package and number of nights
 */
function calculatePackagePrices(offerPackagePrices, extraNights = 0) {
  // null comes through, can't use default props for package prices
  return (offerPackagePrices ?? []).map((price) => {
    if (extraNights === 0) {
      return {
        ...price,
        currency_code: price.currency_code,
        price: price.price,
        lux_plus_price: price.lux_plus_price ?? 0,
        value: price.value,
        nightly_price: price.nightly_price,
        lux_plus_nightly_price: price.lux_plus_nightly_price ?? 0,
        nightly_value: price.nightly_value,
      }
    }

    const hasLuxPlusNightlyPricing = price.lux_plus_price && price.lux_plus_nightly_price

    return {
      ...price,
      currency_code: price.currency_code,
      price: price.price + extraNights * price.nightly_price,
      // for extra nights, if there's a lux plus price but no lux plus nightly price, final lux plus price will be 0
      lux_plus_price: hasLuxPlusNightlyPricing ? price.lux_plus_price + extraNights * price.lux_plus_nightly_price : 0,
      value: price.value + extraNights * price.nightly_value,
      nightly_price: price.nightly_price,
      lux_plus_nightly_price: price.lux_plus_nightly_price ?? 0,
      nightly_value: price.nightly_value,
    }
  })
}

/**
 * Generates a single option for combination of package/package option/extra nights given
 *
 * @param {*} offerPackage a package of an offer
 * @param {*} packageOption a package option of a package in an offer, optional
 * @param {*} extraNights number of extra nights, optional
 * @returns The new option
 */
function generateOption(offerPackage, packageOption, extraNights = 0) {
  return {
    packageId: packageOption.id || offerPackage.id_salesforce_external,
    extraNights: extraNights,
    roomTypeId: offerPackage.fk_room_type_id || undefined,
    roomRateId: packageOption.fk_room_rate_id || offerPackage.fk_room_rate_id || undefined,
    name: packageOption.name || offerPackage.name,
    duration: (offerPackage.number_of_nights || offerPackage.number_of_days) + extraNights,
    prices: calculatePackagePrices(offerPackage.prices, extraNights),
  }
}

/**
 * Generates a list of all the options a user can purchase for a package,
 * including all options available from the flexible nights configuration
 *
 * @param {*} pkg a package of an offer
 * @returns a list of all the options for that package
 */
function generateAllOptions(pkg) {
  const extraNightsCount = (pkg.flexible_nights && pkg.max_extra_nights) || 0
  // package options are optionally setup, so fallback to base package if no options
  const packageOptions = pkg.package_options?.length ? pkg.package_options : [{ fk_room_rate_id: pkg.fk_room_rate_id }]

  return packageOptions.flatMap(packageOption => {
    return [
      // base option at base duration
      generateOption(pkg, packageOption),
      // all extra options that we generate from the flexible nights setup
      ...Array.from({ length: extraNightsCount }, ((_, extraNights) => generateOption(pkg, packageOption, extraNights + 1))),
    ]
  })
}

module.exports = {
  generateAllOptions,
}
