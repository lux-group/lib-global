"use strict";

var _OFFERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../offer/constants'),
    OFFER_TYPE_HOTEL = _require.OFFER_TYPE_HOTEL,
    OFFER_TYPE_TOUR = _require.OFFER_TYPE_TOUR,
    OFFER_TYPE_LAST_MINUTE_HOTEL = _require.OFFER_TYPE_LAST_MINUTE_HOTEL,
    OFFER_TYPE_TACTICAL_AO_HOTEL = _require.OFFER_TYPE_TACTICAL_AO_HOTEL;

var OFFERS = (_OFFERS = {}, _defineProperty(_OFFERS, OFFER_TYPE_TOUR, {
  type: OFFER_TYPE_TOUR,
  parentType: OFFER_TYPE_TOUR,
  dateFloorOffset: 2,
  hourOfDayThreshold: 0,
  useDynamicRate: false,
  useTimezoneOffset: false
}), _defineProperty(_OFFERS, OFFER_TYPE_HOTEL, {
  type: OFFER_TYPE_HOTEL,
  parentType: OFFER_TYPE_HOTEL,
  dateFloorOffset: 2,
  hourOfDayThreshold: 0,
  useDynamicRate: false,
  useTimezoneOffset: false
}), _defineProperty(_OFFERS, OFFER_TYPE_LAST_MINUTE_HOTEL, {
  type: OFFER_TYPE_LAST_MINUTE_HOTEL,
  parentType: OFFER_TYPE_HOTEL,
  dateFloorOffset: 0,
  hourOfDayThreshold: 15,
  useDynamicRate: true,
  useTimezoneOffset: true
}), _defineProperty(_OFFERS, OFFER_TYPE_TACTICAL_AO_HOTEL, {
  type: OFFER_TYPE_TACTICAL_AO_HOTEL,
  parentType: OFFER_TYPE_HOTEL,
  dateFloorOffset: 0,
  hourOfDayThreshold: 15,
  useDynamicRate: true,
  useTimezoneOffset: true
}), _OFFERS);
var CEILING_YEARS = 3;
var DEFAULT_MONTHS_FALLBACK = 18;
var DATE_FORMAT = 'YYYY-MM-DD';
module.exports = {
  CEILING_YEARS: CEILING_YEARS,
  DEFAULT_MONTHS_FALLBACK: DEFAULT_MONTHS_FALLBACK,
  DATE_FORMAT: DATE_FORMAT,
  OFFER_TYPE_HOTEL: OFFER_TYPE_HOTEL,
  OFFER_TYPE_TOUR: OFFER_TYPE_TOUR,
  OFFER_TYPE_LAST_MINUTE_HOTEL: OFFER_TYPE_LAST_MINUTE_HOTEL,
  OFFER_TYPE_TACTICAL_AO_HOTEL: OFFER_TYPE_TACTICAL_AO_HOTEL,
  OFFERS: OFFERS
};