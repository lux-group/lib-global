const expect = require('chai').expect

const { offer: offerLib } = require('../../compiled')

const {
  calculateTaxAmount,
  calculateAmountForEachTax,
  constCalculateTaxBreakdownForEachTax,
} = offerLib.pricing

describe('calculateAmountForEachTax', () => {
  const tests = {
    'default types are amount, per stay and per group (not per person)': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', value: 10 }],
        nights: 3,
      },
      expected: [
        {
          name: 'Tax1',
          total: 30,
          value: 10,
        },
      ],
    },
    'percentage per night for a single night': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 20,
          },
        ],
        nights: 1,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 16.666666666666657,
          type: 'night',
          unit: 'percentage',
          value: 20,
        },
      ],
    },
    'percentage per night for two nights': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 10,
          },
        ],
        nights: 2,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 9.090909090909093,
          type: 'night',
          unit: 'percentage',
          value: 10,
        },
      ],
    },
    'percentage per night for seven nights': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 5,
          },
        ],
        nights: 7,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 9.523809523809518,
          type: 'night',
          unit: 'percentage',
          value: 5,
        },
      ],
    },
    'percentage per stay for a single night': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 20,
          },
        ],
        nights: 1,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 16.666666666666657,
          type: 'stay',
          unit: 'percentage',
          value: 20,
        },
      ],
    },
    'percentage per stay for a seven nights': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 20,
          },
        ],
        nights: 7,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 16.666666666666657,
          type: 'stay',
          unit: 'percentage',
          value: 20,
        },
      ],
    },
    'multiple percentages per night': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 4,
          },
          {
            name: 'Tax2',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 7,
          },
          {
            name: 'Tax3',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 1,
          },
        ],
        nights: 3,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 7.142857142857148,
          type: 'night',
          unit: 'percentage',
          value: 4,
        },
        {
          name: 'Tax2',
          per_person: false,
          total: 12.50000000000001,
          type: 'night',
          unit: 'percentage',
          value: 7,
        },
        {
          name: 'Tax3',
          per_person: false,
          total: 1.785714285714287,
          type: 'night',
          unit: 'percentage',
          value: 1,
        },
      ],
    },
    'multiple percentage per stay': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 6,
          },
          {
            name: 'Tax2',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 22,
          },
          {
            name: 'Tax3',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 5,
          },
        ],
        nights: 4,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 9.022556390977446,
          type: 'stay',
          unit: 'percentage',
          value: 6,
        },
        {
          name: 'Tax2',
          per_person: false,
          total: 33.0827067669173,
          type: 'stay',
          unit: 'percentage',
          value: 22,
        },
        {
          name: 'Tax3',
          per_person: false,
          total: 7.518796992481206,
          type: 'stay',
          unit: 'percentage',
          value: 5,
        },
      ],
    },
    'percentage per night and percentage per stay': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 5,
          },
          {
            name: 'Tax2',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 10,
          },
          {
            name: 'Tax3',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 2,
          },
        ],
        nights: 7,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 8.547008547008542,
          type: 'night',
          unit: 'percentage',
          value: 5,
        },
        {
          name: 'Tax2',
          per_person: false,
          total: 17.094017094017083,
          type: 'stay',
          unit: 'percentage',
          value: 10,
        },
        {
          name: 'Tax3',
          per_person: false,
          total: 3.4188034188034164,
          type: 'stay',
          unit: 'percentage',
          value: 2,
        },
      ],
    },
    'amount per night for a single night': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'night',
            per_person: false,
            value: 10,
          },
        ],
        nights: 1,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 10,
          type: 'night',
          unit: 'amount',
          value: 10,
        },
      ],
    },
    'amount per night for two nights': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'night',
            per_person: false,
            value: 17,
          },
        ],
        nights: 2,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 34,
          type: 'night',
          unit: 'amount',
          value: 17,
        },
      ],
    },
    'amount per night for seven nights': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'night',
            per_person: false,
            value: 5,
          },
        ],
        nights: 7,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 35,
          type: 'night',
          unit: 'amount',
          value: 5,
        },
      ],
    },
    'multiple amount per night': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'night',
            per_person: false,
            value: 10,
          },
          {
            name: 'Tax2',
            unit: 'amount',
            type: 'night',
            per_person: false,
            value: 3,
          },
        ],
        nights: 2,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 20,
          type: 'night',
          unit: 'amount',
          value: 10,
        },
        {
          name: 'Tax2',
          per_person: false,
          total: 6,
          type: 'night',
          unit: 'amount',
          value: 3,
        },
      ],
    },
    'multiple amount per stay': {
      params: {
        total: 300,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'stay',
            per_person: false,
            value: 20,
          },
          {
            name: 'Tax2',
            unit: 'amount',
            type: 'stay',
            per_person: false,
            value: 41,
          },
          {
            name: 'Tax3',
            unit: 'amount',
            type: 'stay',
            per_person: false,
            value: 6,
          },
        ],
        nights: 5,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 20,
          type: 'stay',
          unit: 'amount',
          value: 20,
        },
        {
          name: 'Tax2',
          per_person: false,
          total: 41,
          type: 'stay',
          unit: 'amount',
          value: 41,
        },
        {
          name: 'Tax3',
          per_person: false,
          total: 6,
          type: 'stay',
          unit: 'amount',
          value: 6,
        },
      ],
    },
    'amount per night and amount per stay': {
      params: {
        total: 300,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'night',
            per_person: false,
            value: 15,
          },
          {
            name: 'Tax2',
            unit: 'amount',
            type: 'stay',
            per_person: false,
            value: 7,
          },
        ],
        nights: 5,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: false,
          total: 75,
          type: 'night',
          unit: 'amount',
          value: 15,
        },
        {
          name: 'Tax2',
          per_person: false,
          total: 7,
          type: 'stay',
          unit: 'amount',
          value: 7,
        },
      ],
    },
    'percentage per night and amount per night': {
      params: {
        total: 300,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 5,
          },
          {
            name: 'Tax2',
            unit: 'amount',
            type: 'night',
            per_person: false,
            value: 18,
          },
        ],
        nights: 3,
      },
      expected: [
        {
          name: 'Tax2',
          per_person: false,
          total: 54,
          type: 'night',
          unit: 'amount',
          value: 18,
        },
        {
          name: 'Tax1',
          per_person: false,
          total: 11.714285714285722,
          type: 'night',
          unit: 'percentage',
          value: 5,
        },
      ],
    },
    'percentage and amount per night & percentage and amount per stay': {
      params: {
        total: 1000,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 5,
          },
          {
            name: 'Tax2',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 10,
          },
          {
            name: 'Tax3',
            unit: 'amount',
            type: 'night',
            per_person: false,
            value: 20,
          },
          {
            name: 'Tax4',
            unit: 'amount',
            type: 'stay',
            per_person: false,
            value: 100,
          },
        ],
        nights: 4,
      },
      expected: [
        {
          name: 'Tax3',
          per_person: false,
          total: 80,
          type: 'night',
          unit: 'amount',
          value: 20,
        },
        {
          name: 'Tax4',
          per_person: false,
          total: 100,
          type: 'stay',
          unit: 'amount',
          value: 100,
        },
        {
          name: 'Tax1',
          per_person: false,
          total: 35.652173913043455,
          type: 'night',
          unit: 'percentage',
          value: 5,
        },
        {
          name: 'Tax2',
          per_person: false,
          total: 71.30434782608691,
          type: 'stay',
          unit: 'percentage',
          value: 10,
        },
      ],
    },
    'percentage per night per person (default persons)': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: true,
            value: 2,
          },
        ],
        nights: 5,
      },
      expected: [
        {
          name: 'Tax1',
          per_person: true,
          total: 3.846153846153854,
          type: 'night',
          unit: 'percentage',
          value: 2,
        },
      ],
    },
    'percentage per night per person': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: true,
            value: 2,
          },
        ],
        nights: 5,
        occupancies: [{ adults: 2, children: 1, infants: 0 }],
      },
      expected: [
        {
          name: 'Tax1',
          per_person: true,
          total: 5.660377358490564,
          type: 'night',
          unit: 'percentage',
          value: 2,
        },
      ],
    },
    'percentage per stay per person': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'stay',
            per_person: true,
            value: 10,
          },
        ],
        nights: 7,
        occupancies: [{ adults: 2, children: 1, infants: 1 }],
      },
      expected: [
        {
          name: 'Tax1',
          per_person: true,
          total: 28.57142857142857,
          type: 'stay',
          unit: 'percentage',
          value: 10,
        },
      ],
    },
    'percentage per night and percentage per stay per person': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: true,
            value: 1,
          },
          {
            name: 'Tax2',
            unit: 'percentage',
            type: 'stay',
            per_person: true,
            value: 5,
          },
          {
            name: 'Tax2',
            unit: 'percentage',
            type: 'stay',
            per_person: true,
            value: 2,
          },
        ],
        nights: 7,
        occupancies: [{ adults: 1, children: 1, infants: 1 }],
      },
      expected: [
        {
          name: 'Tax1',
          per_person: true,
          total: 4.838709677419356,
          type: 'night',
          unit: 'percentage',
          value: 1,
        },
        {
          name: 'Tax2',
          per_person: true,
          total: 24.19354838709678,
          type: 'stay',
          unit: 'percentage',
          value: 5,
        },
        {
          name: 'Tax2',
          per_person: true,
          total: 9.677419354838712,
          type: 'stay',
          unit: 'percentage',
          value: 2,
        },
      ],
    },
    'amount per night per person': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'night',
            per_person: true,
            value: 5,
          },
        ],
        nights: 7,
        occupancies: [{ adults: 2, children: 0, infants: 0 }],
      },
      expected: [
        {
          name: 'Tax1',
          per_person: true,
          total: 70,
          type: 'night',
          unit: 'amount',
          value: 5,
        },
      ],
    },
    'amount per night and amount per stay per person': {
      params: {
        total: 300,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'night',
            per_person: true,
            value: 15,
          },
          {
            name: 'Tax2',
            unit: 'amount',
            type: 'stay',
            per_person: true,
            value: 7,
          },
        ],
        nights: 5,
        occupancies: [{ adults: 2, children: 0, infants: 0 }],
      },
      expected: [
        {
          name: 'Tax1',
          per_person: true,
          total: 150,
          type: 'night',
          unit: 'amount',
          value: 15,
        },
        {
          name: 'Tax2',
          per_person: true,
          total: 14,
          type: 'stay',
          unit: 'amount',
          value: 7,
        },
      ],
    },
    'percentage per night and amount per night per person': {
      params: {
        total: 300,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: true,
            value: 3,
          },
          {
            name: 'Tax2',
            unit: 'amount',
            type: 'night',
            per_person: true,
            value: 10,
          },
        ],
        nights: 3,
        occupancies: [{ adults: 1, children: 3, infants: 1 }],
      },
      expected: [
        {
          name: 'Tax2',
          per_person: true,
          total: 150,
          type: 'night',
          unit: 'amount',
          value: 10,
        },
        {
          name: 'Tax1',
          per_person: true,
          total: 19.565217391304344,
          type: 'night',
          unit: 'percentage',
          value: 3,
        },
      ],
    },
    'percentage and amount per night & percentage and amount per stay per person':
      {
        params: {
          total: 1000,
          taxesAndFees: [
            {
              name: 'Tax1',
              unit: 'percentage',
              type: 'night',
              per_person: true,
              value: 1,
            },
            {
              name: 'Tax2',
              unit: 'percentage',
              type: 'stay',
              per_person: true,
              value: 4,
            },
            {
              name: 'Tax3',
              unit: 'amount',
              type: 'night',
              per_person: true,
              value: 20,
            },
            {
              name: 'Tax4',
              unit: 'amount',
              type: 'stay',
              per_person: true,
              value: 40,
            },
          ],
          nights: 4,
          occupancies: [{ adults: 3, children: 0, infants: 0 }],
        },
        expected: [
          {
            name: 'Tax3',
            per_person: true,
            total: 240,
            type: 'night',
            unit: 'amount',
            value: 20,
          },
          {
            name: 'Tax4',
            per_person: true,
            total: 120,
            type: 'stay',
            unit: 'amount',
            value: 40,
          },
          {
            name: 'Tax1',
            per_person: true,
            total: 16.69565217391303,
            type: 'night',
            unit: 'percentage',
            value: 1,
          },
          {
            name: 'Tax2',
            per_person: true,
            total: 66.78260869565212,
            type: 'stay',
            unit: 'percentage',
            value: 4,
          },
        ],
      },
    'mix of per person & per night & per stay': {
      params: {
        total: 1000,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: true,
            value: 2,
          },
          {
            name: 'Tax2',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 5,
          },
          {
            name: 'Tax3',
            unit: 'amount',
            type: 'night',
            per_person: false,
            value: 10,
          },
          {
            name: 'Tax4',
            unit: 'amount',
            type: 'stay',
            per_person: true,
            value: 26,
          },
        ],
        nights: 4,
        occupancies: [{ adults: 3, children: 1, infants: 0 }],
      },
      expected: [
        {
          name: 'Tax3',
          per_person: false,
          total: 40,
          type: 'night',
          unit: 'amount',
          value: 10,
        },
        {
          name: 'Tax4',
          per_person: true,
          total: 104,
          type: 'stay',
          unit: 'amount',
          value: 26,
        },
        {
          name: 'Tax1',
          per_person: true,
          total: 60.601769911504356,
          type: 'night',
          unit: 'percentage',
          value: 2,
        },
        {
          name: 'Tax2',
          per_person: false,
          total: 37.87610619469022,
          type: 'stay',
          unit: 'percentage',
          value: 5,
        },
      ],
    },
    'percentage and amount per night & percentage and amount per stay per person and multiple rooms':
      {
        params: {
          total: 1000,
          taxesAndFees: [
            {
              name: 'Tax1',
              unit: 'percentage',
              type: 'night',
              per_person: true,
              value: 1,
            },
            {
              name: 'Tax2',
              unit: 'percentage',
              type: 'stay',
              per_person: true,
              value: 4,
            },
            {
              name: 'Tax3',
              unit: 'amount',
              type: 'night',
              per_person: false,
              value: 20,
            },
            {
              name: 'Tax4',
              unit: 'amount',
              type: 'stay',
              per_person: false,
              value: 40,
            },
          ],
          nights: 4,
          occupancies: [
            { adults: 3, children: 0, infants: 0 },
            { adults: 2, children: 0, infants: 0 },
          ],
        },
        expected: [
          {
            name: 'Tax3',
            per_person: false,
            total: 160,
            type: 'night',
            unit: 'amount',
            value: 20,
          },
          {
            name: 'Tax4',
            per_person: false,
            total: 80,
            type: 'stay',
            unit: 'amount',
            value: 40,
          },
          {
            name: 'Tax1',
            per_person: true,
            total: 30.400000000000002,
            type: 'night',
            unit: 'percentage',
            value: 1,
          },
          {
            name: 'Tax2',
            per_person: true,
            total: 121.60000000000001,
            type: 'stay',
            unit: 'percentage',
            value: 4,
          },
        ],
      },
  }

  for (const key in tests) {
    const test = tests[key]
    it(`should return tax calculated by ${key}`, () => {
      const result = calculateAmountForEachTax(test.params)
      expect(result).to.deep.equal(test.expected)
    })
  }
})

describe('constCalculateTaxBreakdownForEachTax', () => {
  const tests = {
    'percentage per night for 3 nights': {
      params: {
        total: 1019,
        taxesAndFees: [
          {
            name: 'VAT',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 10,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
        ],
        nights: 3,
      },
      expected: [
        {
          name: 'VAT',
          dynamic_tax: false,
          unit: 'percentage',
          additional_tax: false,
          duration_type: 'night',
          value: 10,
          currency: '',
          per_person: false,
          sell: 92,
          sell_currency: 'AUD',
        },
      ],
    },
    'percentage per stay for 7 nights': {
      params: {
        total: 100,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 20,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
        ],
        nights: 7,
      },
      expected: [
        {
          name: 'Tax1',
          dynamic_tax: false,
          unit: 'percentage',
          additional_tax: false,
          duration_type: 'stay',
          value: 20,
          currency: '',
          per_person: false,
          sell: 16,
          sell_currency: 'AUD',
        },
      ],
    },
    'multiple percentages per night': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 4,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
          {
            name: 'Tax2',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 7,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
          {
            name: 'Tax3',
            unit: 'percentage',
            type: 'night',
            per_person: false,
            value: 1,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
        ],
        nights: 3,
      },
      expected: [
        {
          name: 'Tax1',
          unit: 'percentage',
          additional_tax: false,
          duration_type: 'night',
          value: 4,
          dynamic_tax: false,
          currency: '',
          per_person: false,
          sell: 7,
          sell_currency: 'AUD',
        },
        {
          name: 'Tax2',
          unit: 'percentage',
          additional_tax: false,
          duration_type: 'night',
          value: 7,
          dynamic_tax: false,
          currency: '',
          per_person: false,
          sell: 12,
          sell_currency: 'AUD',
        },
        {
          name: 'Tax3',
          unit: 'percentage',
          additional_tax: false,
          duration_type: 'night',
          value: 1,
          dynamic_tax: false,
          currency: '',
          per_person: false,
          sell: 1,
          sell_currency: 'AUD',
        },
      ],
    },
    'multiple percentage per stay': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 6,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
          {
            name: 'Tax2',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 22,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
          {
            name: 'Tax3',
            unit: 'percentage',
            type: 'stay',
            per_person: false,
            value: 5,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
        ],
        nights: 4,
      },
      expected: [
        {
          name: 'Tax1',
          unit: 'percentage',
          additional_tax: false,
          duration_type: 'stay',
          value: 6,
          dynamic_tax: false,
          currency: '',
          per_person: false,
          sell: 9,
          sell_currency: 'AUD',
        },
        {
          name: 'Tax2',
          unit: 'percentage',
          additional_tax: false,
          duration_type: 'stay',
          value: 22,
          dynamic_tax: false,
          currency: '',
          per_person: false,
          sell: 33,
          sell_currency: 'AUD',
        },
        {
          name: 'Tax3',
          unit: 'percentage',
          additional_tax: false,
          duration_type: 'stay',
          value: 5,
          dynamic_tax: false,
          currency: '',
          per_person: false,
          sell: 7,
          sell_currency: 'AUD',
        },
      ],
    },
    'amount per night per person': {
      params: {
        total: 200,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'night',
            per_person: true,
            value: 5,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
        ],
        nights: 7,
        occupancies: [{ adults: 2, children: 0, infants: 0 }],
      },
      expected: [
        {
          name: 'Tax1',
          unit: 'amount',
          additional_tax: false,
          duration_type: 'night',
          value: 5,
          dynamic_tax: false,
          currency: '',
          per_person: true,
          sell: 70,
          sell_currency: 'AUD',
        },
      ],
    },
    'amount per night and amount per stay per person': {
      params: {
        total: 300,
        taxesAndFees: [
          {
            name: 'Tax1',
            unit: 'amount',
            type: 'night',
            per_person: true,
            value: 15,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
          {
            name: 'Tax2',
            unit: 'amount',
            type: 'stay',
            per_person: true,
            value: 7,
            currency: '',
            additional_tax: false,
            sell_currency: 'AUD',
          },
        ],
        nights: 5,
        occupancies: [{ adults: 2, children: 0, infants: 0 }],
      },
      expected: [
        {
          name: 'Tax1',
          unit: 'amount',
          additional_tax: false,
          duration_type: 'night',
          value: 15,
          dynamic_tax: false,
          currency: '',
          per_person: true,
          sell: 150,
          sell_currency: 'AUD',
        },
        {
          name: 'Tax2',
          unit: 'amount',
          additional_tax: false,
          duration_type: 'stay',
          value: 7,
          dynamic_tax: false,
          currency: '',
          per_person: true,
          sell: 14,
          sell_currency: 'AUD',
        },
      ],
    },
  }

  for (const key in tests) {
    const test = tests[key]
    it(`should return tax breakdown by ${key}`, () => {
      const result = constCalculateTaxBreakdownForEachTax(test.params)
      expect(result).to.deep.equal(test.expected)
    })
  }
})

describe('calculateTaxAmount', () => {
  it('should get correct total', () => {
    const result = calculateTaxAmount({
      total: 1000,
      taxesAndFees: [
        {
          name: 'Tax1',
          unit: 'percentage',
          type: 'night',
          per_person: true,
          value: 2,
        },
        {
          name: 'Tax2',
          unit: 'percentage',
          type: 'stay',
          per_person: false,
          value: 5,
        },
        {
          name: 'Tax3',
          unit: 'amount',
          type: 'night',
          per_person: false,
          value: 10,
        },
        {
          name: 'Tax4',
          unit: 'amount',
          type: 'stay',
          per_person: true,
          value: 26,
          payable_at_property: false,
        },

        {
          name: 'Tax5',
          unit: 'percentage',
          type: 'stay',
          per_person: false,
          value: 10,
          payable_at_property: true,
        },
        {
          name: 'Tax6',
          unit: 'amount',
          type: 'stay',
          per_person: false,
          value: 5,
          payable_at_property: true,
        },
      ],
      nights: 4,
      occupancies: [{ adults: 3, children: 1, infants: 0 }],
    })
    expect(result).to.deep.equal({ taxesAndFees: 242, propertyFees: 80 })
  })
})
