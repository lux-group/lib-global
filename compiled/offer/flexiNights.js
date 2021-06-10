'use strict'

var _extends = Object.assign || function(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key] } } } return target }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i] } return arr2 } else { return Array.from(arr) } }

/**
 * Generate the id of the package option
 *
 * @param {*} packageOption, a package of an offer
 * @param {*} duration, number of nights
 * @returns the id of the package option
 */
var getPackageOptionId = function getPackageOptionId(packageOption, duration) {
  var packageOptionsId = packageOption.id ? packageOption.id : packageOption.fk_room_rate_id

  return packageOptionsId + '++' + duration
}

/**
 * Generates the JSON format for a package duration
 *
 * @param {*} packageOption, a package of an offer
 * @param {*} duration, number of nights
 * @param {*} packagePrices, the list of prices in the package
 * @returns JSON format of a package duration
 */
var getPackageDuration = function getPackageDuration(packageOption, duration, packagePrices) {
  var result = {
    packageId: packageOption.fk_room_rate_id,
    packageOptionsId: getPackageOptionId(packageOption, duration),
    roomRateId: packageOption.fk_room_rate_id,
    name: packageOption.name || undefined,
    duration: duration,
  }
  return packagePrices ? _extends({}, result, { prices: calculatePackageRates(packagePrices, duration) }) : result
}

/**
 * Gets the package_options if exists or if not the room rate id
 *
 * @param {*} offerPackage, a package of an offer
 * @returns package_options if exists and if not the room rate id
 */
var getPakcageOptions = function getPakcageOptions(offerPackage) {
  return offerPackage.package_options && offerPackage.package_options.length > 0 ? offerPackage.package_options : [{ fk_room_rate_id: offerPackage.fk_room_rate_id }]
}

/**
 * Generates a list of package options, adding new options for flexible nights
 *
 * @param {*} offerPackage, a package of an offer
 * @param {*} addPrices, boolean that indicates if list of prices will
 * be included for each package options
 * @returns a list of package options
 */
var generatePackageDurations = function generatePackageDurations(offerPackage) {
  var addPrices = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined

  var result = []
  if (!offerPackage) return result

  var packageOptions = getPakcageOptions(offerPackage)
  var packagePrices = addPrices ? [].concat(_toConsumableArray(offerPackage.prices)) : undefined

  var maxExtraNights = offerPackage.flexible_nights && offerPackage.max_extra_nights ? offerPackage.max_extra_nights : 0

  var _loop = function _loop(extraNights) {
    var duration = offerPackage.number_of_nights + extraNights
    packageOptions.forEach(function(packageOption) {
      result.push(getPackageDuration(packageOption, duration, packagePrices))
    })
  }

  for (var extraNights = 0; extraNights <= maxExtraNights; extraNights++) {
    _loop(extraNights)
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
var calculatePackageRates = function calculatePackageRates(offerPackagePrices, duration) {
  return offerPackagePrices.map(function(price) {
    return _extends({}, price, {
      price: price.price + duration * price.nightly_price,
      value: price.value + duration * price.nightly_value,
      nightly_price: 0,
      nightly_value: 0,
    })
  })
}

module.exports = {
  getPackageDuration: getPackageDuration,
  generatePackageDurations: generatePackageDurations,
  calculatePackageRates: calculatePackageRates,
}
