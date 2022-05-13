"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTypeForCategory = exports.allTypes = exports.allCategories = exports.allTypesAndCategories = exports.CAMPSITE = exports.HOUSEBOAT = exports.PRIVATEVACATIONHOME = exports.APARTMENT = exports.VILLA = exports.COTTAGE = exports.CHALET = exports.CABIN = exports.RIAD = exports.ALLINCLUSIVE = exports.AGRITOURISM = exports.COUNTRYHOUSE = exports.APARTHOTEL = exports.TREEHOUSE = exports.RYOKAN = exports.LODGE = exports.GUESTHOUSE = exports.BEDBREAKFAST = exports.INN = exports.CONDOMINIUMRESORT = exports.PALACE = exports.CASTLE = exports.RESORT = exports.HOTEL = void 0;
var HOTEL = 'Hotel';
exports.HOTEL = HOTEL;
var RESORT = 'Resort';
exports.RESORT = RESORT;
var CASTLE = 'Castle';
exports.CASTLE = CASTLE;
var PALACE = 'Palace';
exports.PALACE = PALACE;
var CONDOMINIUMRESORT = 'Condominium resort';
exports.CONDOMINIUMRESORT = CONDOMINIUMRESORT;
var INN = 'Inn';
exports.INN = INN;
var BEDBREAKFAST = 'Bed & breakfast';
exports.BEDBREAKFAST = BEDBREAKFAST;
var GUESTHOUSE = 'Guesthouse';
exports.GUESTHOUSE = GUESTHOUSE;
var LODGE = 'Lodge';
exports.LODGE = LODGE;
var RYOKAN = 'Ryokan';
exports.RYOKAN = RYOKAN;
var TREEHOUSE = 'Tree house property';
exports.TREEHOUSE = TREEHOUSE;
var APARTHOTEL = 'Aparthotel';
exports.APARTHOTEL = APARTHOTEL;
var COUNTRYHOUSE = 'Country House';
exports.COUNTRYHOUSE = COUNTRYHOUSE;
var AGRITOURISM = 'Agritourism property';
exports.AGRITOURISM = AGRITOURISM;
var ALLINCLUSIVE = 'All-inclusive property';
exports.ALLINCLUSIVE = ALLINCLUSIVE;
var RIAD = 'Riad';
exports.RIAD = RIAD;
var CABIN = 'Cabin';
exports.CABIN = CABIN;
var CHALET = 'Chalet';
exports.CHALET = CHALET;
var COTTAGE = 'Cottage';
exports.COTTAGE = COTTAGE;
var VILLA = 'Villa';
exports.VILLA = VILLA;
var APARTMENT = 'Apartment';
exports.APARTMENT = APARTMENT;
var PRIVATEVACATIONHOME = 'Private vacation home';
exports.PRIVATEVACATIONHOME = PRIVATEVACATIONHOME;
var HOUSEBOAT = 'Houseboat';
exports.HOUSEBOAT = HOUSEBOAT;
var CAMPSITE = 'Campsite';
exports.CAMPSITE = CAMPSITE;
var HOTEL_TYPE = [HOTEL, RESORT, CASTLE, PALACE, INN, BEDBREAKFAST, GUESTHOUSE, LODGE, RYOKAN, TREEHOUSE, APARTHOTEL, COUNTRYHOUSE, AGRITOURISM, ALLINCLUSIVE, RIAD];
var UNIQUE_STAYS_TYPE = [CABIN, CHALET, COTTAGE, VILLA, APARTMENT, PRIVATEVACATIONHOME, HOUSEBOAT, CONDOMINIUMRESORT, CAMPSITE];
var allTypesAndCategories = {
  HOTEL: HOTEL_TYPE,
  UNIQUE_STAYS: UNIQUE_STAYS_TYPE
};
exports.allTypesAndCategories = allTypesAndCategories;
var allCategories = HOTEL_TYPE.concat(UNIQUE_STAYS_TYPE);
exports.allCategories = allCategories;
var allTypes = ['HOTEL', 'UNIQUE_STAYS'];
/**
 * Checks if a category name is a unique stay category, else assume it's a hotel
 * @param categoryName
 * @returns {string}
 */

exports.allTypes = allTypes;

var defaultTypeForCategory = function defaultTypeForCategory(categoryName) {
  if (UNIQUE_STAYS_TYPE.includes(categoryName)) {
    return 'UNIQUE_STAYS';
  }

  return 'HOTEL';
};

exports.defaultTypeForCategory = defaultTypeForCategory;