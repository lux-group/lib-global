const ALLOWED_DESTINATIONS = [
  { code: 'ADL', name: 'Adelaide (ADL)' },
  { code: 'DPS', name: 'Bali - Denpasar (DPS)' },
  { code: 'PEK', name: 'Bejing (PEK)' },
  { code: 'BNE', name: 'Brisbane (BNE)' },
  { code: 'CNS', name: 'Cairns (CNS)' },
  { code: 'CNX', name: 'Chiang Mai - Thailand (CNX)' },
  { code: 'DAD', name: 'DaNang - Vietnam (DAD)' },
  { code: 'DXB', name: 'Dubai (DXB)' },
  { code: 'OOL', name: 'Gold Coast (OOL)' },
  { code: 'HTI', name: 'Hamilton Island (HTI)' },
  { code: 'HBA', name: 'Hobart (HBA)' },
  { code: 'HKG', name: 'Hong Kong (HKG)' },
  { code: 'HNL', name: 'Honolulu  (HNL)' },
  { code: 'KUL', name: 'Kuala Lumpur (KUL)' },
  { code: 'MEL', name: 'Melbourne -Tullamarine (MEL)' },
  { code: 'NAN', name: 'Nadi - Fiji (NAN)' },
  { code: 'PER', name: 'Perth (PER)' },
  { code: 'HKT', name: 'Phuket - Thailand (HKT)' },
  { code: 'SIN', name: 'Singapore (SIN)' },
  { code: 'SYD', name: 'Sydney (SYD)' },
  { code: 'NRT', name: 'Tokyo (NRT)' },
]

const ALLOWED_DESTINATION_CODES = ALLOWED_DESTINATIONS.map(
  destination => destination.code
)

const ALLOWED_DESTINATION_NAMES = ALLOWED_DESTINATIONS.map(
  destination => destination.name
)

module.exports = {
  ALLOWED_DESTINATIONS: ALLOWED_DESTINATIONS,
  ALLOWED_DESTINATION_CODES: ALLOWED_DESTINATION_CODES,
  ALLOWED_DESTINATION_NAMES: ALLOWED_DESTINATION_NAMES,
}
