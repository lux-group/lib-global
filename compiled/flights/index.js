'use strict';

var ALLOWED_DESTINATIONS = [{ code: 'ADL', name: 'Adelaide (ADL)' }, { code: 'BNE', name: 'Brisbane (BNE)' }, { code: 'CNS', name: 'Cairns (CNS)' }, { code: 'CNX', name: 'Chiang Mai - Thailand (CNX)' }, { code: 'DAD', name: 'DaNang - Vietnam (DAD)' }, { code: 'DPS', name: 'Bali - Denpasar (DPS)' }, { code: 'DXB', name: 'Dubai (DXB)' }, { code: 'HBA', name: 'Hobart (HBA)' }, { code: 'HKG', name: 'Hong Kong (HKG)' }, { code: 'HKT', name: 'Phuket - Thailand (HKT)' }, { code: 'HNL', name: 'Honolulu  (HNL)' }, { code: 'HTI', name: 'Hamilton Island (HTI)' }, { code: 'KUL', name: 'Kuala Lumpur (KUL)' }, { code: 'MEL', name: 'Melbourne -Tullamarine (MEL)' }, { code: 'NAN', name: 'Nadi - Fiji (NAN)' }, { code: 'NRT', name: 'Tokyo (NRT)' }, { code: 'OOL', name: 'Gold Coast (OOL)' }, { code: 'PEK', name: 'Bejing (PEK)' }, { code: 'PER', name: 'Perth (PER)' }, { code: 'SIN', name: 'Singapore (SIN)' }, { code: 'SYD', name: 'Sydney (SYD)' }];

var ALLOWED_DESTINATION_CODES = ALLOWED_DESTINATIONS.map(function (destination) {
  return destination.code;
});

var ALLOWED_DESTINATION_NAMES = ALLOWED_DESTINATIONS.map(function (destination) {
  return destination.name;
});

module.exports = {
  ALLOWED_DESTINATIONS: ALLOWED_DESTINATIONS,
  ALLOWED_DESTINATION_CODES: ALLOWED_DESTINATION_CODES,
  ALLOWED_DESTINATION_NAMES: ALLOWED_DESTINATION_NAMES
};