"use strict";

var dayOrNights = {
  hotel: {
    singular: 'Night',
    plural: 'Nights',
    field: 'number_of_nights'
  },
  tour: {
    singular: 'Day',
    plural: 'Days',
    field: 'number_of_days'
  }
};

var getCounts = function getCounts(packages, field) {
  return packages.reduce(function (acc, offerPackage) {
    var duration = parseInt(offerPackage[field]);

    if (!acc.includes(duration)) {
      acc.push(duration);
    }

    return acc;
  }, []).sort(function (a, b) {
    return a - b;
  });
};

var getCountsString = function getCountsString(packages, field) {
  var durationCounts = getCounts(packages, field);

  if (durationCounts.length === 1) {
    return "".concat(durationCounts[0]);
  }

  return "".concat(durationCounts.slice(0, -1).join(', '), " or ").concat(durationCounts.slice(-1)[0]);
};

var getFromPackages = function getFromPackages(packages, offerType, holidayTypes) {
  var dayOrNightsData = dayOrNights[offerType];

  if (holidayTypes) {// Block for holidayTypes
  }

  var singular = dayOrNightsData.singular,
      plural = dayOrNightsData.plural,
      field = dayOrNightsData.field;
  var durationCounts = getCounts(packages, field);
  var durationString = getCountsString(packages, field);

  if (durationCounts.length === 1 && durationCounts[0] === 1) {
    return "".concat(durationString, " ").concat(singular);
  }

  return "".concat(durationString, " ").concat(plural);
};

module.exports = {
  getCounts: getCounts,
  getCountsString: getCountsString,
  getFromPackages: getFromPackages
};