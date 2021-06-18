"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Calculates the duration based on number of nights/days and extra nights
 *
 * @param {*} offerPackageDuration, total number of nights/days for a given package
 * @param {*} extraNights, number of extra nights
 * @returns the duration of the package option
 */
var calculateDuration = function calculateDuration(offerPackageDuration, extraNights) {
  return offerPackageDuration ? offerPackageDuration + extraNights : offerPackageDuration;
};

/**
 * Calculates the prices based on number of nights and the package prices list
 *
 * @param {*} offerPackagePrices, list of prices of the package
 * @param {*} extraNights, number of extra nights
 * @returns a list of prices based on prices in the package and number of nights
 */
var calculatePackagePrices = function calculatePackagePrices(offerPackagePrices, extraNights) {
  return offerPackagePrices.map(function (price) {
    var packagePrice = extraNights && extraNights > 0 ? price.price + extraNights * price.nightly_price : price.price;
    var packageValue = extraNights && extraNights > 0 ? price.value + extraNights * price.nightly_value : price.value;
    return _extends({}, price, {
      price: packagePrice,
      value: packageValue,
      nightly_price: price.nightly_price,
      nightly_value: price.nightly_value
    });
  }, []);
};

/**
 * Generates a package option
 *
 * @param {*} packageOption, a package of an offer
 * @param {*} offerPackage, a package of an offer
 * @param {*} extraNights, number of extra nights
 * @returns Generates a package option
 */
var generatePackageOption = function generatePackageOption(packageOption, offerPackage, extraNights) {
  var offerPackageDuration = offerPackage.number_of_nights || offerPackage.number_of_days;
  var offerPackagePrices = offerPackage.prices ? [].concat(_toConsumableArray(offerPackage.prices)) : [];

  return {
    packageId: packageOption.id || offerPackage.id,
    extraNights: extraNights,
    roomTypeId: offerPackage.fk_room_type_id || undefined,
    roomRateId: offerPackage.fk_room_rate_id || undefined,
    name: packageOption.name || offerPackage.name,
    duration: calculateDuration(offerPackageDuration, extraNights),
    prices: calculatePackagePrices(offerPackagePrices, extraNights)
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
 * Add the flexible nights package options
 *
 * @param {*} offerPackage, a package of an offer
 * @param {*} packageOption, a package of an offer
 * @returns a list of flexible nights package options
 */
var generateFlexiNightsPackageOptions = function generateFlexiNightsPackageOptions(offerPackage, packageOption) {
  var result = [];
  for (var extraNights = 1; extraNights <= offerPackage.max_extra_nights; extraNights++) {
    result.push(generatePackageOption(packageOption, offerPackage, extraNights));
  }
  return result;
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

  packageOptions.forEach(function (packageOption) {
    result.push(generatePackageOption(packageOption, offerPackage, 0));
    if (offerPackage.flexible_nights && offerPackage.max_extra_nights) {
      result.push.apply(result, _toConsumableArray(generateFlexiNightsPackageOptions(offerPackage, packageOption)));
    }
  });

  return result;
};

module.exports = {
  calculateDuration: calculateDuration,
  generatePackageOption: generatePackageOption,
  calculatePackagePrices: calculatePackagePrices,
  generateAllPackageOptions: generateAllPackageOptions,
  generateFlexiNightsPackageOptions: generateFlexiNightsPackageOptions
};