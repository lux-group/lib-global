const expect = require('chai').expect

const { offer: offerLib } = require('../../compiled')

const { calculateTaxAmount, calculateAmountForEachTax } = offerLib.pricing

describe('calculateAmountForEachTax', () => {
  const tests = {
    'default types are amount, per stay and per group (not per person)': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', value: 10 }],
        nights: 3,
      },
      expected: {
        taxesAndFeesTotal: 30,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               total: 30,
               value: 10,
             }
        ]
      },
    },
    'percentage per night for a single night': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 20 }],
        nights: 1,
      },
      expected: {
        taxesAndFeesTotal: 16,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: false,
               total: 16.666666666666657,
               type: "night",
               unit: "percentage",
               value: 20,
             }
        ]
      },
    },
    'percentage per night for two nights': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 10 }],
        nights: 2,
      },
      expected: {
        taxesAndFeesTotal: 16,
        taxesAndFeesWithTotalForEach: [
            {
                name: "Tax1",
                per_person: false,
                total: 16.666666666666657,
                type: "night",
                unit: "percentage",
                value: 10,
              }
        ]
      },
    },
    'percentage per night for seven nights': {
      params: {
        total: 200,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: false, value: 5 }],
        nights: 7,
      },
      expected: {
        taxesAndFeesTotal: 51,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: false,
               total: 51.85185185185185,
               type: "night",
               unit: "percentage",
               value: 5,
             }
        ]
      },
    },
    'percentage per stay for a single night': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'stay', per_person: false, value: 20 }],
        nights: 1,
      },
      expected: {
        taxesAndFeesTotal: 16,
        taxesAndFeesWithTotalForEach: [
            {
                name: "Tax1",
                per_person: false,
                total: 16.666666666666657,
                type: "stay",
                unit: "percentage",
                value: 20,
              }
        ]
      },
    },
    'percentage per stay for a seven nights': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'stay', per_person: false, value: 20 }],
        nights: 7,
      },
      expected: {
        taxesAndFeesTotal: 16,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: false,
               total: 16.666666666666657,
               type: "stay",
               unit: "percentage",
               value: 20,
             }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 52,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: false,
               total: 17.64705882352941,
               type: "night",
               unit: "percentage",
               value: 4,
             },
             {
               name: "Tax2",
               per_person: false,
               total: 30.88235294117647,
               type: "night",
               unit: "percentage",
               value: 7,
             },
             {
               name: "Tax3",
               per_person: false,
               total: 4.411764705882352,
               type: "night",
               unit: "percentage",
               value: 1,
             }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 49,
        taxesAndFeesWithTotalForEach: [
            {
                name: "Tax1",
                per_person: false,
                total: 9.022556390977446,
                type: "stay",
                unit: "percentage",
                value: 6,
              },
              {
                name: "Tax2",
                per_person: false,
                total: 33.0827067669173,
                type: "stay",
                unit: "percentage",
                value: 22,
              },
              {
                name: "Tax3",
                per_person: false,
                total: 7.518796992481206,
                type: "stay",
                unit: "percentage",
                value: 5,
              }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 63,
        taxesAndFeesWithTotalForEach: [
            {
                name: "Tax1",
                per_person: false,
                total: 47.619047619047606,
                type: "night",
                unit: "percentage",
                value: 5,
              },
              {
                name: "Tax2",
                per_person: false,
                total: 13.605442176870746,
                type: "stay",
                unit: "percentage",
                value: 10,
              },
              {
                name: "Tax2",
                per_person: false,
                total: 2.721088435374149,
                type: "stay",
                unit: "percentage",
                value: 2,
              }
        ]
      },
    },
    'amount per night for a single night': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'amount', type: 'night', per_person: false, value: 10 }],
        nights: 1,
      },
      expected: {
        taxesAndFeesTotal: 10,
        taxesAndFeesWithTotalForEach: [
            {
                name: "Tax1",
                per_person: false,
                total: 10,
                type: "night",
                unit: "amount",
                value: 10,
              }
            ]
        
      },
    },
    'amount per night for two nights': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'amount', type: 'night', per_person: false, value: 17 }],
        nights: 2,
      },
      expected: {
        taxesAndFeesTotal: 34,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: false,
               total: 34,
               type: "night",
               unit: "amount",
               value: 17,
             }
        ]
      },
    },
    'amount per night for seven nights': {
      params: {
        total: 200,
        taxesAndFees: [{ name: 'Tax1', unit: 'amount', type: 'night', per_person: false, value: 5 }],
        nights: 7,
      },
      expected: {
        taxesAndFeesTotal: 35,
        taxesAndFeesWithTotalForEach: [
            {
                name: "Tax1",
                per_person: false,
                total: 35,
                type: "night",
                unit: "amount",
                value: 5,
              }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 26,
        taxesAndFeesWithTotalForEach: [
            {
                name: "Tax1",
                per_person: false,
                total: 20,
                type: "night",
                unit: "amount",
                value: 10,
              },
              {
                name: "Tax2",
                per_person: false,
                total: 6,
                type: "night",
                unit: "amount",
                value: 3,
              }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 67,
        taxesAndFeesWithTotalForEach: [
            {
                name: "Tax1",
                per_person: false,
                total: 20,
                type: "stay",
                unit: "amount",
                value: 20,
              },
              {
                name: "Tax2",
                per_person: false,
                total: 41,
                type: "stay",
                unit: "amount",
                value: 41,
              },
              {
                name: "Tax3",
                per_person: false,
                total: 6,
                type: "stay",
                unit: "amount",
                value: 6,
              }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 82,
        taxesAndFeesWithTotalForEach: [
          {
              name: "Tax1",
              per_person: false,
              total: 75,
              type: "night",
              unit: "amount",
              value: 15,
            },
            {
              name: "Tax2",
              per_person: false,
              total: 7,
              type: "stay",
              unit: "amount",
              value: 7,
            }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 86,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax2",
               per_person: false,
               total: 54,
               type: "night",
               unit: "amount",
               value: 18,
             },
             {
               name: "Tax1",
               per_person: false,
               total: 32.086956521739125,
               type: "night",
               unit: "percentage",
               value: 5,
             }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 369,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax3",
               per_person: false,
               total: 80,
               type: "night",
               unit: "amount",
               value: 20,
             },
             {
               name: "Tax4",
               per_person: false,
               total: 100,
               type: "stay",
               unit: "amount",
               value: 100,
             },
             {
               name: "Tax1",
               per_person: false,
               total: 126.15384615384619,
               type: "night",
               unit: "percentage",
               value: 5,
             },
             {
               name: "Tax2",
               per_person: false,
               total: 63.076923076923094,
               type: "stay",
               unit: "percentage",
               value: 10,
             }
        ]
      },
    },
    'percentage per night per person (default persons)': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: true, value: 2 }],
        nights: 5,
      },
      expected: {
        taxesAndFeesTotal: 16,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: true,
               total: 16.666666666666657,
               type: "night",
               unit: "percentage",
               value: 2,
             }
        ]
      },
    },
    'percentage per night per person': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'night', per_person: true, value: 2 }],
        nights: 5,
        occupancies: [{ adults: 2, children: 1, infants: 0 }],
      },
      expected: {
        taxesAndFeesTotal: 23,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: true,
               total: 23.07692307692308,
               type: "night",
               unit: "percentage",
               value: 2,
             }
        ]
      },
    },
    'percentage per stay per person': {
      params: {
        total: 100,
        taxesAndFees: [{ name: 'Tax1', unit: 'percentage', type: 'stay', per_person: true, value: 10 }],
        nights: 7,
        occupancies: [{ adults: 2, children: 1, infants: 1 }],
      },
      expected: {
        taxesAndFeesTotal: 28,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: true,
               total: 28.57142857142857,
               type: "stay",
               unit: "percentage",
               value: 10,
             }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 59,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: true,
               total: 29.577464788732385,
               type: "night",
               unit: "percentage",
               value: 1,
             },
             {
               name: "Tax2",
               per_person: true,
               total: 21.126760563380277,
               type: "stay",
               unit: "percentage",
               value: 5,
             },
             {
               name: "Tax2",
               per_person: true,
               total: 8.45070422535211,
               type: "stay",
               unit: "percentage",
               value: 2,
             }
        ]
      },
    },
    'amount per night per person': {
      params: {
        total: 200,
        taxesAndFees: [{ name: 'Tax1', unit: 'amount', type: 'night', per_person: true, value: 5 }],
        nights: 7,
        occupancies: [{ adults: 2, children: 0, infants: 0 }],
      },
      expected: {
        taxesAndFeesTotal: 70,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: true,
               total: 70,
               type: "night",
               unit: "amount",
               value: 5,
             }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 164,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax1",
               per_person: true,
               total: 150,
               type: "night",
               unit: "amount",
               value: 15,
             },
             {
               name: "Tax2",
               per_person: true,
               total: 14,
               type: "stay",
               unit: "amount",
               value: 7,
             }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 196,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax2",
               per_person: true,
               total: 150,
               type: "night",
               unit: "amount",
               value: 10,
             },
             {
               name: "Tax1",
               per_person: true,
               total: 46.55172413793103,
               type: "night",
               unit: "percentage",
               value: 3,
             }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 483,
        taxesAndFeesWithTotalForEach: [
           {
               name: "Tax3",
               per_person: true,
               total: 240,
               type: "night",
               unit: "amount",
               value: 20,
             },
             {
               name: "Tax4",
               per_person: true,
               total: 120,
               type: "stay",
               unit: "amount",
               value: 40,
             },
             {
               name: "Tax1",
               per_person: true,
               total: 61.935483870967744,
               type: "night",
               unit: "percentage",
               value: 1,
             },
             {
               name: "Tax2",
               per_person: true,
               total: 61.935483870967744,
               type: "stay",
               unit: "percentage",
               value: 4,
             }
        ]
      },
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
      expected: {
        taxesAndFeesTotal: 375,
        taxesAndFeesWithTotalForEach: [
          {
            name: "Tax3",
            per_person: false,
            total: 40,
            type: "night",
            unit: "amount",
            value: 10,
          },
          {
            name: "Tax4",
            per_person: true,
            total: 104,
            type: "stay",
            unit: "amount",
            value: 26,
          },
          {
            name: "Tax1",
            per_person: true,
            total: 199.9416058394161,
            type: "night",
            unit: "percentage",
            value: 2,
          },
          {
            name: "Tax2",
            per_person: false,
            total: 31.240875912408768,
            type: "stay",
            unit: "percentage",
            value: 5,
          }
        ]
      }
    }
  }

  for (const key in tests) {
    const test = tests[key]
    it(`should return tax calculated by ${key}`, () => {
      const result = calculateAmountForEachTax(test.params)
      expect(result).to.deep.equal(test.expected)
    })
  }
})

describe('calculateAmountForEachTax', () => {
    it(`should get correct total`, () => {
      const result = calculateTaxAmount({
        total: 1000,
        taxesAndFees: [
          { name: 'Tax1', unit: 'percentage', type: 'night', per_person: true, value: 2 },
          { name: 'Tax2', unit: 'percentage', type: 'stay', per_person: false, value: 5 },
          { name: 'Tax3', unit: 'amount', type: 'night', per_person: false, value: 10 },
          { name: 'Tax4', unit: 'amount', type: 'stay', per_person: true, value: 26 },
        ],
        nights: 4,
        occupancies: [{ adults: 3, children: 1, infants: 0 }],
      })
      expect(result).to.equal(375)
    })
})
