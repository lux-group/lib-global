"use strict";

var HOTEL = ['Hotel', 'Resort', 'Castle', 'Palace', 'Condominium resort', 'Inn', 'Bed & breakfast', 'Guesthouse', 'Lodge', 'Ryokan', 'Tree house property', 'Aparthotel', 'Country House', 'Agritoursm property', 'All-inclusive property', 'Riad'];
var UNIQUE_STAYS = ['Cabin', 'Chalet', 'Cottage', 'Villa', 'Apartment', 'Private vacation home', 'Houseboat', 'Condominium resort', 'Campsite'];
var allTypesAndCategories = {
  HOTEL: HOTEL,
  UNIQUE_STAYS: UNIQUE_STAYS
};
var allCategories = HOTEL.concat(UNIQUE_STAYS);
var allTypes = ['HOTEL', 'UNIQUE_STAYS'];

var defaultTypeForCategory = function defaultTypeForCategory(categoryName) {
  if (HOTEL.includes(categoryName)) {
    return 'HOTEL';
  }

  if (UNIQUE_STAYS.includes(categoryName)) {
    return 'UNIQUE_STAYS';
  }

  return null;
};

module.exports = {
  defaultTypeForCategory: defaultTypeForCategory,
  allTypesAndCategories: allTypesAndCategories,
  allCategories: allCategories,
  allTypes: allTypes
};