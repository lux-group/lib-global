export const HOTEL = 'Hotel'
export const RESORT = 'Resort'
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

const HOTEL_TYPE = [
  HOTEL,
  RESORT,
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
]

const UNIQUE_STAYS_TYPE = [
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

export const allTypesAndCategories = { HOTEL: HOTEL_TYPE, UNIQUE_STAYS: UNIQUE_STAYS_TYPE }

export const allCategories = HOTEL_TYPE.concat(UNIQUE_STAYS_TYPE)

export const allTypes = ['HOTEL', 'UNIQUE_STAYS']

/**
 * Checks if a category name is a unique stay category, else assume it's a hotel
 * @param categoryName
 * @returns {string}
 */
export const defaultTypeForCategory = (categoryName) => {
  if (UNIQUE_STAYS_TYPE.includes(categoryName)) {
    return 'UNIQUE_STAYS'
  }
  return 'HOTEL'
}
