export const extraGuests = require('./extraGuests')
export const HOTEL_TYPE = 'HOTEL'
export const UNIQUE_STAYS_TYPE = 'UNIQUE_STAYS'
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

export const allTypesAndCategories = { HOTEL: hotelTypeCategories, UNIQUE_STAYS: uniqueStaysCategories }

export const allCategories = hotelTypeCategories.concat(uniqueStaysCategories)

export const allSubCategories = subCategories

export const allTypes = [HOTEL_TYPE, UNIQUE_STAYS_TYPE]

/**
 * Checks if a category name is a unique stay category, else assume it's a hotel
 * @param categoryName
 * @returns {string}
 */
export const defaultTypeForCategory = (categoryName) => {
  if (uniqueStaysCategories.includes(categoryName)) {
    return UNIQUE_STAYS_TYPE
  }
  return HOTEL_TYPE
}
