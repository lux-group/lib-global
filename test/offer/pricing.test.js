const expect = require('chai').expect

const { offer: offerLib } = require('../../compiled')

const { calculateTaxAmount } = offerLib.pricing

describe('calculateTaxAmount', () => {
  const tests = {
    'percentage per night for a single night': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 20 }],
        nights: 1,
      },
      expected: 16,
    },
    'percentage per night for two nights': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 10 }],
        nights: 2,
      },
      expected: 16,
    },
    'percentage per night for seven nights': {
      params: {
        total: 200,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 5 }],
        nights: 7,
      },
      expected: 51,
    },
    'percentage per stay for a single night': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'stay', per_person: false, value: 20 }],
        nights: 1,
      },
      expected: 16,
    },
    'percentage per stay for a seven nights': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'stay', per_person: false, value: 20 }],
        nights: 7,
      },
      expected: 16,
    },
    'multiple percentages per night': {
      params: {
        total: 200,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 4 },
          { name: 'Tax2', unit: 'percentage', type: 'night', per_person: false, value: 7 },
          { name: 'Tax3', unit: 'percentage', type: 'night', per_person: false, value: 1 },
        ],
        nights: 3,
      },
      expected: 52,
    },
    'multiple percentage per stay': {
      params: {
        total: 200,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'stay', per_person: false, value: 6 },
          { name: 'Tax2', unit: 'percentage', type: 'stay', per_person: false, value: 22 },
          { name: 'Tax3', unit: 'percentage', type: 'stay', per_person: false, value: 5 },
        ],
        nights: 4,
      },
      expected: 49,
    },
    'percentage per night and percentage per stay': {
      params: {
        total: 200,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 5 },
          { name: 'Tax2', unit: 'percentage', type: 'stay', per_person: false, value: 10 },
          { name: 'Tax2', unit: 'percentage', type: 'stay', per_person: false, value: 2 },
        ],
        nights: 7,
      },
      expected: 63,
    },
    'amount per night for a single night': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'amount', type: 'night', per_person: false, value: 10 }],
        nights: 1,
      },
      expected: 10,
    },
    'amount per night for two nights': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'amount', type: 'night', per_person: false, value: 17 }],
        nights: 2,
      },
      expected: 34,
    },
    'amount per night for seven nights': {
      params: {
        total: 200,
        taxesAndFees: [{ name: 'Tax1', unit: 'amount', type: 'night', per_person: false, value: 5 }],
        nights: 7,
      },
      expected: 35,
    },
    'multiple amount per night': {
      params: {
        total: 100,
        taxesAndFees: [
          { name: 'Tax1', unit: 'amount', type: 'night', per_person: false, value: 10 },
          { name: 'Tax2', unit: 'amount', type: 'night', per_person: false, value: 3 },
        ],
        nights: 2,
      },
      expected: 26,
    },
    'multiple amount per stay': {
      params: {
        total: 300,
        taxesAndFees: [
          { name: 'Tax1', unit: 'amount', type: 'stay', per_person: false, value: 20 },
          { name: 'Tax2', unit: 'amount', type: 'stay', per_person: false, value: 41 },
          { name: 'Tax3', unit: 'amount', type: 'stay', per_person: false, value: 6 },
        ],
        nights: 5,
      },
      expected: 67,
    },
    'amount per night and amount per stay': {
      params: {
        total: 300,
        taxesAndFees: [
          { name: 'Tax1', unit: 'amount', type: 'night', per_person: false, value: 15 },
          { name: 'Tax2', unit: 'amount', type: 'stay', per_person: false, value: 7 },
        ],
        nights: 5,
      },
      expected: 82,
    },
    'percentage per night and amount per night': {
      params: {
        total: 300,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 5 },
          { name: 'Tax2', unit: 'amount', type: 'night', per_person: false, value: 18 },
        ],
        nights: 3,
      },
      expected: 86,
    },
    'percentage and amount per night & percentage and amount per stay': {
      params: {
        total: 1000,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 5 },
          { name: 'Tax2', unit: 'percentage', type: 'stay', per_person: false, value: 10 },
          { name: 'Tax3', unit: 'amount', type: 'night', per_person: false, value: 20 },
          { name: 'Tax4', unit: 'amount', type: 'stay', per_person: false, value: 100 },
        ],
        nights: 4,
      },
      expected: 369,
    },
    'percentage per night per person (default persons)': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: true, value: 2 }],
        nights: 5,
      },
      expected: 16,
    },
    'percentage per night per person': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: true, value: 2 }],
        nights: 5,
        occupancies: [{ adults: 2, children: 1, infants: 0 }],
      },
      expected: 23,
    },
    'percentage per stay per person': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'stay', per_person: true, value: 10 }],
        nights: 7,
        occupancies: [{ adults: 2, children: 1, infants: 1 }],
      },
      expected: 28,
    },
    'percentage per night and percentage per stay per person': {
      params: {
        total: 200,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'night', per_person: true, value: 1 },
          { name: 'Tax2', unit: 'percentage', type: 'stay', per_person: true, value: 5 },
          { name: 'Tax2', unit: 'percentage', type: 'stay', per_person: true, value: 2 },
        ],
        nights: 7,
        occupancies: [{ adults: 1, children: 1, infants: 1 }],
      },
      expected: 59,
    },
    'amount per night per person': {
      params: {
        total: 200,
        taxesAndFees: [{ name: 'Tax1', unit: 'amount', type: 'night', per_person: true, value: 5 }],
        nights: 7,
        occupancies: [{ adults: 2, children: 0, infants: 0 }],
      },
      expected: 70,
    },
    'amount per night and amount per stay per person': {
      params: {
        total: 300,
        taxesAndFees: [
          { name: 'Tax1', unit: 'amount', type: 'night', per_person: true, value: 15 },
          { name: 'Tax2', unit: 'amount', type: 'stay', per_person: true, value: 7 },
        ],
        nights: 5,
        occupancies: [{ adults: 2, children: 0, infants: 0 }],
      },
      expected: 164,
    },
    'percentage per night and amount per night per person': {
      params: {
        total: 300,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'night', per_person: true, value: 3 },
          { name: 'Tax2', unit: 'amount', type: 'night', per_person: true, value: 10 },
        ],
        nights: 3,
        occupancies: [{ adults: 1, children: 3, infants: 1 }],
      },
      expected: 196,
    },
    'percentage and amount per night & percentage and amount per stay per person': {
      params: {
        total: 1000,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'night', per_person: true, value: 1 },
          { name: 'Tax2', unit: 'percentage', type: 'stay', per_person: true, value: 4 },
          { name: 'Tax3', unit: 'amount', type: 'night', per_person: true, value: 20 },
          { name: 'Tax4', unit: 'amount', type: 'stay', per_person: true, value: 40 },
        ],
        nights: 4,
        occupancies: [{ adults: 3, children: 0, infants: 0 }],
      },
      expected: 483,
    },
    'mix of per person & per night & per stay': {
      params: {
        total: 1000,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'night', per_person: true, value: 2 },
          { name: 'Tax2', unit: 'percentage', type: 'stay', per_person: false, value: 5 },
          { name: 'Tax3', unit: 'amount', type: 'night', per_person: false, value: 10 },
          { name: 'Tax4', unit: 'amount', type: 'stay', per_person: true, value: 26 },
        ],
        nights: 4,
        occupancies: [{ adults: 3, children: 1, infants: 0 }],
      },
      expected: 375,
    },
  }

  for (const key in tests) {
    const test = tests[key]
    it(`should return tax calculated by ${key}`, () => {
      const result = calculateTaxAmount(test.params)
      expect(result).to.equal(test.expected)
    })
  }
})
