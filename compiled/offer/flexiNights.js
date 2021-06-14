"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Generates the JSON format for a package option
 *
 * @param {*} packageOption, a package of an offer
 * @param {*} numberOfNights, number of nights
 * @param {*} extraNights, number of extra nights
 * @returns JSON format of a package option
 */
var generatePackageOption = function generatePackageOption(packageOption, numberOfNights, extraNights) {
  return {
    packageId: packageOption.fk_room_rate_id,
    extraNights: extraNights,
    roomRateId: packageOption.fk_room_rate_id,
    name: packageOption.name || undefined,
    duration: numberOfNights + extraNights
  };
};

/**
 * Gets the package_options in the package if exists or if not the room rate id
 *
 * @param {*} offerPackage, a package of an offer
 * @returns package_options in the package if exists and if not the room rate id
 */
var getPackageOptions = function getPackageOptions(offerPackage) {
  return offerPackage.package_options && offerPackage.package_options.length > 0 ? offerPackage.package_options : [{ fk_room_rate_id: offerPackage.fk_room_rate_id }];
};

/**
 * Generates a list of all the package options, adding new options for flexible nights
 *
 * @param {*} offerPackage, a package of an offer
 * @returns a list of all the package options
 */
var generateAllPackageOptions = function generateAllPackageOptions(offerPackage) {
  var result = [];
  if (!offerPackage) return result;

  var packageOptions = getPackageOptions(offerPackage);

  var maxExtraNights = offerPackage.flexible_nights && offerPackage.max_extra_nights ? offerPackage.max_extra_nights : 0;

  var _loop = function _loop(extraNights) {
    packageOptions.forEach(function (packageOption) {
      result.push(generatePackageOption(packageOption, offerPackage.number_of_nights, extraNights));
    });
  };

  for (var extraNights = 0; extraNights <= maxExtraNights; extraNights++) {
    _loop(extraNights);
  }
  return result;
};

/**
 * Calculates the prices based on number of nights and the package prices list
 *
 * @param {*} offerPackagePrices, list of prices of the package
 * @param {*} duration, number of nights
 * @returns a list of prices based on prices in the package and number of nights
 */
var calculatePackagePrices = function calculatePackagePrices(offerPackagePrices, duration) {
  return offerPackagePrices.map(function (price) {
    return _extends({}, price, {
      price: price.price + duration * price.nightly_price,
      value: price.value + duration * price.nightly_value,
      nightly_price: 0,
      nightly_value: 0
    });
  });
};

/**
 * Generates a list of all the package options with their prices,
 * adding new options for flexible nights
 *
 * @param {*} offerPackage, a package of an offer
 * @returns a list of all the package options with their prices
 */
var generateAllPackageOptionsWithPrices = function generateAllPackageOptionsWithPrices(offerPackage) {
  var offerPackagePrices = offerPackage.prices ? [].concat(_toConsumableArray(offerPackage.prices)) : undefined;

  var allPackageOptions = generateAllPackageOptions(offerPackage);
  var result = allPackageOptions.map(function (packageOption) {
    return _extends({}, packageOption, {
      prices: offerPackagePrices ? calculatePackagePrices(offerPackagePrices, packageOption.duration) : undefined
    });
  });
  return result;
};

module.exports = {
  generatePackageOption: generatePackageOption,
  calculatePackagePrices: calculatePackagePrices,
  generateAllPackageOptions: generateAllPackageOptions,
  generateAllPackageOptionsWithPrices: generateAllPackageOptionsWithPrices
};