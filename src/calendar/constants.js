const { OFFER_TYPE_HOTEL, OFFER_TYPE_TOUR, OFFER_TYPE_LAST_MINUTE_HOTEL, OFFER_TYPE_TACTICAL_AO_HOTEL, OFFER_TYPE_RENTAL, OFFER_TYPE_BUNDLE_AND_SAVE } = require('../offer/constants')

const OFFERS = {
  [OFFER_TYPE_TOUR]: {
    type: OFFER_TYPE_TOUR,
    parentType: OFFER_TYPE_TOUR,
    dateFloorOffset: 2,
    hourOfDayThreshold: 0,
    useDynamicRate: false,
    useTimezoneOffset: false,
    isSupported: false,
  },
  [OFFER_TYPE_HOTEL]: {
    type: OFFER_TYPE_HOTEL,
    parentType: OFFER_TYPE_HOTEL,
    dateFloorOffset: 2,
    hourOfDayThreshold: 0,
    useDynamicRate: false,
    useTimezoneOffset: false,
    isSupported: true,
  },
  [OFFER_TYPE_LAST_MINUTE_HOTEL]: {
    type: OFFER_TYPE_LAST_MINUTE_HOTEL,
    parentType: OFFER_TYPE_HOTEL,
    dateFloorOffset: 0,
    hourOfDayThreshold: 15,
    useDynamicRate: true,
    useTimezoneOffset: true,
    isSupported: true,
  },
  [OFFER_TYPE_TACTICAL_AO_HOTEL]: {
    type: OFFER_TYPE_TACTICAL_AO_HOTEL,
    parentType: OFFER_TYPE_HOTEL,
    dateFloorOffset: 0,
    hourOfDayThreshold: 15,
    useDynamicRate: true,
    useTimezoneOffset: true,
    isSupported: true,
  },
  [OFFER_TYPE_RENTAL]: {
    type: OFFER_TYPE_RENTAL,
    parentType: OFFER_TYPE_HOTEL,
    dateFloorOffset: 0,
    hourOfDayThreshold: 15,
    useDynamicRate: true,
    useTimezoneOffset: true,
    isSupported: true,
  },
  [OFFER_TYPE_BUNDLE_AND_SAVE]: {
    type: OFFER_TYPE_BUNDLE_AND_SAVE,
    parentType: OFFER_TYPE_HOTEL,
    dateFloorOffset: 0,
    hourOfDayThreshold: 15,
    useDynamicRate: true,
    useTimezoneOffset: true,
    isSupported: false,
  },
}

const CEILING_YEARS = 3
const DEFAULT_MONTHS_FALLBACK = 18
const DATE_FORMAT = 'YYYY-MM-DD'

module.exports = {
  CEILING_YEARS,
  DEFAULT_MONTHS_FALLBACK,
  DATE_FORMAT,
  OFFER_TYPE_HOTEL,
  OFFER_TYPE_TOUR,
  OFFER_TYPE_LAST_MINUTE_HOTEL,
  OFFER_TYPE_TACTICAL_AO_HOTEL,
  OFFER_TYPE_RENTAL,
  OFFER_TYPE_BUNDLE_AND_SAVE,
  OFFERS,
}
