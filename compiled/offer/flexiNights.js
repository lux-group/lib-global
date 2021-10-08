"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Calculates the prices based on number of nights and the package prices list
 *
 * @param {*} offerPackagePrices list of prices of the package
 * @param {*} extraNights number of extra nights
 * @returns a list of prices based on prices in the package and number of nights
 */
function calculatePackagePrices(offerPackagePrices) {
  var extraNights = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // null comes through, can't use default props for package prices
  return (offerPackagePrices !== null && offerPackagePrices !== void 0 ? offerPackagePrices : []).map(function (price) {
    return _objectSpread(_objectSpread({}, price), {}, {
      currency_code: price.currency_code,
      price: price.price + extraNights * price.nightly_price,
      value: price.value + extraNights * price.nightly_value,
      nightly_price: price.nightly_price,
      nightly_value: price.nightly_value
    });
  });
}
/**
 * Generates a single option for combination of package/package option/extra nights given
 *
 * @param {*} offerPackage a package of an offer
 * @param {*} packageOption a package option of a package in an offer, optional
 * @param {*} extraNights number of extra nights, optional
 * @returns The new option
 */


function generateOption(offerPackage, packageOption) {
  var extraNights = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return {
    packageId: packageOption.id || offerPackage.id_salesforce_external,
    extraNights: extraNights,
    roomTypeId: offerPackage.fk_room_type_id || undefined,
    roomRateId: packageOption.fk_room_rate_id || offerPackage.fk_room_rate_id || undefined,
    name: packageOption.name || offerPackage.name,
    duration: (offerPackage.number_of_nights || offerPackage.number_of_days) + extraNights,
    prices: calculatePackagePrices(offerPackage.prices, extraNights)
  };
}
/**
 * Generates a list of all the options a user can purchase for a package,
 * including all options available from the flexible nights configuration
 *
 * @param {*} pkg a package of an offer
 * @returns a list of all the options for that package
 */


function generateAllOptions(pkg) {
  var _pkg$package_options;

  var extraNightsCount = pkg.flexible_nights && pkg.max_extra_nights || 0; // package options are optionally setup, so fallback to base package if no options

  var packageOptions = (_pkg$package_options = pkg.package_options) !== null && _pkg$package_options !== void 0 && _pkg$package_options.length ? pkg.package_options : [{
    fk_room_rate_id: pkg.fk_room_rate_id
  }];
  return packageOptions.flatMap(function (packageOption) {
    return [// base option at base duration
    generateOption(pkg, packageOption)].concat(_toConsumableArray(Array.from({
      length: extraNightsCount
    }, function (_, extraNights) {
      return generateOption(pkg, packageOption, extraNights + 1);
    })));
  });
}

module.exports = {
  generateAllOptions: generateAllOptions
};