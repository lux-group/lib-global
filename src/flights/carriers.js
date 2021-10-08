const allAirlines = require('airline-codes/airlines.json')

const AIRLINE_MAP = allAirlines.reduce((result, airline) => {
  if (airline.active === 'Y' && airline.iata) {
    result[airline.iata] = airline.name
  }
  return result
}, {})

const unknownCarriers = {}

const OVERRIDES = {
  JQ: 'Jetstar Airways',
  '3K': 'Jetstar Asia Airways',
  GK: 'Jetstar Japan',
  BL: 'Jetstar Pacific',
  QF: 'Qantas Airways',
  SQ: 'Singapore Airlines',
  WE: 'Thai Smile Airways Company Limited',
  E2: 'Kampuchea Airlines',
  UK: 'Vistara',
  EH: 'Air Nippon Wings',
  FJ: 'Fiji Airways',
  LL: 'Miami Air International',
  EB: 'Wamos Air',
  '9B': 'AccesRail',
  GQ: 'Sky Express',
  WI: 'White Airways',
  X9: 'Avion Express',
  EE: 'Nordica',
  TR: 'Scoot',
}

const getAirlineName = carrierCode => {
  const overrideName = OVERRIDES[carrierCode]
  if (overrideName) {
    return overrideName
  }

  const name = AIRLINE_MAP[carrierCode]
  if (name) {
    return name
  }
  if (!unknownCarriers[carrierCode]) {
    console.error('Unknown carrier', carrierCode)
    unknownCarriers[carrierCode] = true
  }
  return `Unknown carrier (${carrierCode})`
}

const getAllCarriers = () => {
  return Object.keys(AIRLINE_MAP).sort().map(code => { return { code: code, name: getAirlineName(code) } })
}

module.exports = {
  getAirlineName,
  getAllCarriers,
}
