export const extraGuests = require('./extraGuests')
export const HOTEL_TYPE = 'HOTEL'
export const UNIQUE_STAYS_TYPE = 'UNIQUE_STAYS'
export const RENTAL_TYPE = 'RENTAL'
export const HOTELSRESORTS = 'Hotels & Resorts'
export const CASTLE = 'Castle'
export const PALACE = 'Palace'
export const CONDOMINIUMRESORT = 'Condominium resort'
export const INN = 'Inn'
export const BEDBREAKFAST = 'Bed & breakfast'
export const GUESTHOUSE = 'Guesthouse'
export const LODGE = 'Lodge'
export const RYOKAN = 'Ryokan'
export const TREEHOUSE = 'Tree house property'
export const APARTHOTEL = 'Aparthotel'
export const COUNTRYHOUSE = 'Country House'
export const AGRITOURISM = 'Agritourism property'
export const ALLINCLUSIVE = 'All-inclusive property'
export const RIAD = 'Riad'
export const CABIN = 'Cabin'
export const CHALET = 'Chalet'
export const COTTAGE = 'Cottage'
export const VILLA = 'Villa'
export const APARTMENT = 'Apartment'
export const PRIVATEVACATIONHOME = 'Private vacation home'
export const HOUSEBOAT = 'Houseboat'
export const CAMPSITE = 'Campsite'
export const ULTRA_LUX = 'Ultra Lux'

const hotelTypeCategories = [
  CASTLE,
  PALACE,
  INN,
  BEDBREAKFAST,
  GUESTHOUSE,
  LODGE,
  RYOKAN,
  TREEHOUSE,
  APARTHOTEL,
  COUNTRYHOUSE,
  AGRITOURISM,
  ALLINCLUSIVE,
  RIAD,
  HOTELSRESORTS,
]

const subCategories = [
  ULTRA_LUX,
]

const uniqueStaysCategories = [
  CABIN,
  CHALET,
  COTTAGE,
  VILLA,
  APARTMENT,
  PRIVATEVACATIONHOME,
  HOUSEBOAT,
  CONDOMINIUMRESORT,
  CAMPSITE,
]

const rentalCategories = [
  ALLINCLUSIVE,
  APARTMENT,
  BEDBREAKFAST,
  CABIN,
  CAMPSITE,
  CASTLE,
  CHALET,
  CONDOMINIUMRESORT,
  COUNTRYHOUSE,
  GUESTHOUSE,
  HOTELSRESORTS,
  INN,
  LODGE,
  PRIVATEVACATIONHOME,
  VILLA,
]

export const allTypesAndCategories = { HOTEL: hotelTypeCategories, UNIQUE_STAYS: uniqueStaysCategories, RENTAL: rentalCategories }

export const allSubCategories = subCategories

export const allCategories =  [...new Set(hotelTypeCategories.concat(uniqueStaysCategories).concat(rentalCategories))]

export const allTypes = [HOTEL_TYPE, UNIQUE_STAYS_TYPE, RENTAL_TYPE]

/**
 * Checks if a category name is a unique stay category
 * @param categoryName
 * @returns {string}
 */
export const isUniqueStay = (categoryName) => allTypesAndCategories.UNIQUE_STAYS.includes(categoryName)
