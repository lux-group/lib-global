const chai = require('chai')
const expect = chai.expect

const { offer: offerLib } = require('../../compiled')

const {
  generatePackageDurations,
} = offerLib.flexibleNights

const OFFER_TYPE_HOTEL = 'hotel'
const TYPE_SCHEDULE_ONLINE_PURCHASE = 'online_purchase'

const prices = [
  {
    'currency_code': 'EUR',
    'price': 74,
    'value': 124,
    'nightly_price': 60,
    'nightly_value': 30,
  },
  {
    'currency_code': 'AUD',
    'price': 120,
    'value': 200,
    'nightly_price': 80,
    'nightly_value': 50,
  },
]

const offer = {
  type: OFFER_TYPE_HOTEL,
  schedules: [
    {
      type: TYPE_SCHEDULE_ONLINE_PURCHASE,
      region: 'AU',
      end: '2260-04-25',
    },
  ],
  packages: [
    {
      id_salesforce_external: 'p1',
      fk_property_id: 'prop1',
      fk_room_type_id: 'room1',
      fk_room_rate_id: 'rr1',
      number_of_nights: 1,
      max_extra_nights: 5,
      status: 'content-approved',
      name: 'Flex Nights Premium',
      flexible_nights: true,
      prices,
      package_options: [ ],
      rates: [
        {
          number_of_nights: 3,
          duration: 3,
          duration_label: '3 Nights',
          fk_room_rate_id: 'rr1',
          unique_key: 'a0s0T00000064CCQAY',
          price: 120,
          value: 200,
          prices: [],
        },
      ],
    },
    {
      id_salesforce_external: 'p1',
      fk_property_id: 'prop2',
      fk_room_type_id: 'room2',
      fk_room_rate_id: 'rr2',
      number_of_nights: 3,
      max_extra_nights: 0,
      status: 'content-approved',
      name: 'Flex Nights Premium 2',
      flexible_nights: true,
      prices: [],
      package_options: [ ],
      rates: [
        {
          number_of_nights: 3,
          duration: 3,
          duration_label: '3 Nights',
          fk_room_rate_id: 'rr1',
          unique_key: 'a0s0T00000064CCQAY',
          price: 120,
          value: 200,
          prices: [],
        },
      ],
    },
    {
      id_salesforce_external: 'p1',
      fk_property_id: 'prop1',
      fk_room_type_id: 'room1',
      fk_room_rate_id: 'rr1',
      number_of_nights: 1,
      max_extra_nights: 5,
      status: 'content-approved',
      name: 'Flex Nights Premium',
      flexible_nights: false,
      prices,
      package_options: [ ],
      rates: [
        {
          number_of_nights: 3,
          duration: 3,
          duration_label: '3 Nights',
          fk_room_rate_id: 'rr1',
          unique_key: 'a0s0T00000064CCQAY',
          price: 120,
          value: 200,
          prices: [],
        },
      ],
    },
  ],
}

describe('Offer: Flexible nights', () => {
  describe('Flexible nights true', () => {
    it('should return five extra package options', async() => {
      const offerPackage = offer.packages[0]
      const result = generatePackageDurations(offerPackage)

      const expectedResult = [
        {
          packageId: 'rr1',
          packageOptionsId: 'rr1++1',
          roomRateId: 'rr1',
          name: undefined,
          duration: 1,
        },
        {
          packageId: 'rr1',
          packageOptionsId: 'rr1++2',
          roomRateId: 'rr1',
          name: undefined,
          duration: 2,
        },
        {
          packageId: 'rr1',
          packageOptionsId: 'rr1++3',
          roomRateId: 'rr1',
          name: undefined,
          duration: 3,
        },
        {
          packageId: 'rr1',
          packageOptionsId: 'rr1++4',
          roomRateId: 'rr1',
          name: undefined,
          duration: 4,
        },
        {
          packageId: 'rr1',
          packageOptionsId: 'rr1++5',
          roomRateId: 'rr1',
          name: undefined,
          duration: 5,
        },
        {
          packageId: 'rr1',
          packageOptionsId: 'rr1++6',
          roomRateId: 'rr1',
          name: undefined,
          duration: 6,
        },
      ]

      expect(result).to.eql(expectedResult)
    })

    it('should return one package options', async() => {
      const offerPackage = offer.packages[2]
      const result = generatePackageDurations(offerPackage)

      const expectedResult = [
        {
          packageId: 'rr1',
          packageOptionsId: 'rr1++1',
          roomRateId: 'rr1',
          name: undefined,
          duration: 1,
        },
      ]
      expect(result).to.eql(expectedResult)
    })

    it('should return empty rates', async() => {
      const offerPackage = offer.packages[1]
      const result = generatePackageDurations(offerPackage, true)

      expect(result[0].prices).to.eql([])
    })

    it('should return rates for the extra package options', async() => {
      const offerPackage = offer.packages[0]
      const result = generatePackageDurations(offerPackage, true)

      expect(result[1].prices).to.eql([
        {
          currency_code: 'EUR',
          price: 194,
          value: 184,
          nightly_price: 0,
          nightly_value: 0,
        },
        {
          currency_code: 'AUD',
          price: 280,
          value: 300,
          nightly_price: 0,
          nightly_value: 0,
        },
      ])
    })
  })

  describe('Flexible nights false', () => {
    it('should return one extra package options', async() => {
      const offerPackage = offer.packages[1]
      const result = generatePackageDurations(offerPackage)

      const expectedResult = [
        {
          packageId: 'rr2',
          packageOptionsId: 'rr2++3',
          roomRateId: 'rr2',
          name: undefined,
          duration: 3,
        },
      ]
      expect(result).to.eql(expectedResult)
    })
  })
})
