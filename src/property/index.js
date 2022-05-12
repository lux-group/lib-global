const HOTEL = [
  'Hotel',
  'Resort',
  'Castle',
  'Palace',
  'Condominium resort',
  'Inn',
  'Bed & breakfast',
  'Guesthouse',
  'Lodge',
  'Ryokan',
  'Tree house property',
  'Aparthotel',
  'Country House',
  'Agritoursm property',
  'All-inclusive property',
  'Riad']

const UNIQUE_STAYS = [
  'Cabin',
  'Chalet',
  'Cottage',
  'Villa',
  'Apartment',
  'Private vacation home',
  'Houseboat',
  'Condominium resort',
  'Campsite',
]

const allTypesAndCategories = { HOTEL, UNIQUE_STAYS }

const allCategories = HOTEL.concat(UNIQUE_STAYS)

const allTypes = ['HOTEL', 'UNIQUE_STAYS']

const defaultTypeForCategory = (categoryName) => {
  if (HOTEL.includes(categoryName)) {
    return 'HOTEL'
  }
  if (UNIQUE_STAYS.includes(categoryName)) {
    return 'UNIQUE_STAYS'
  }
  return null
}

module.exports = {
  defaultTypeForCategory,
  allTypesAndCategories,
  allCategories,
  allTypes,
}
