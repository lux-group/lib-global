'use strict';

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
  },
  cruises: {
    singular: 'Night',
    plural: 'Nights',
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
    return '' + durationCounts[0];
  }

  return durationCounts.slice(0, -1).join(', ') + ' or ' + durationCounts.slice(-1)[0];
};

var getFromPackages = function getFromPackages(packages, offerType, holidayTypes) {
  var dayOrNightsData = dayOrNights[offerType];

  if (holidayTypes && holidayTypes.includes('Cruises')) {
    dayOrNightsData = dayOrNights['cruises'];
  }

  var _dayOrNightsData = dayOrNightsData,
      singular = _dayOrNightsData.singular,
      plural = _dayOrNightsData.plural,
      field = _dayOrNightsData.field;

  var durationCounts = getCounts(packages, field);
  var durationString = getCountsString(packages, field);

  if (durationCounts.length === 1 && durationCounts[0] === 1) {
    return durationString + ' ' + singular;
  }

  return durationString + ' ' + plural;
};

module.exports = {
  getCounts: getCounts,
  getCountsString: getCountsString,
  getFromPackages: getFromPackages
};