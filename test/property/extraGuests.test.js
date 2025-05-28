const chai = require('chai')

const { property } = require('../../compiled')

const expect = chai.expect

const buildParams = (opts = {}) => ({
  adults: 2,
  children: 1,
  infants: 0,
  includedGuests: [{
    adults: 2,
    children: 1,
    infants: 0,
  }],
  ...opts,
})

describe('property = extraGuests', function() {
  describe('get', function() {
    it('should return no extra guests if no room configuration is passed in', () => {
      const params = buildParams({ adults: 0, children: 0, infants: 0 })
      expect(property.extraGuests.get(params)).to.eql([])
    })

    it('should return no extra guests if extra guest surcharges do not apply (i.e. included guests are not configured)', () => {
      const params = buildParams({ includedGuests: [] })
      expect(property.extraGuests.get(params)).to.eql([])
    })

    it('should return no extra guests if the configuration fits in the included guests defined', () => {
      const params = buildParams({
        adults: 3,
        children: 0,
        infants: 0,
        includedGuests: [{ adults: 3, children: 0, infants: 0 }],
      })
      expect(property.extraGuests.get(params)).to.eql([])
    })

    it('should return the extra guest amount', () => {
      const params = buildParams({
        adults: 3,
        children: 2,
        infants: 1,
        includedGuests: [
          { adults: 1, children: 2, infants: 0 },
        ],
      })
      expect(property.extraGuests.get(params)).to.eql([
        {
          adults: 2,
          children: 0,
          infants: 1,
        },
      ])
    })

    it('should return multiple extra guest amount', () => {
      const params = buildParams({
        adults: 1,
        children: 2,
        infants: 0,
        includedGuests: [
          { adults: 2, children: 0, infants: 1 },
          { adults: 1, children: 1, infants: 1 },
        ],
      })
      expect(property.extraGuests.get(params)).to.eql([
        {
          adults: 0,
          children: 2,
          infants: 0,
        },
        {
          adults: 0,
          children: 1,
          infants: 0,
        },
      ])
    })

    it('should handle teenager counts in extra guests calculation', () => {
      const params = buildParams({
        adults: 3,
        children: 2,
        infants: 1,
        teenagers: 2,
        includedGuests: [
          { adults: 1, children: 1, infants: 0, teenagers: 1 },
        ],
      })
      expect(property.extraGuests.get(params)).to.eql([
        {
          adults: 2,
          children: 1,
          infants: 1,
          teenagers: 1,
        },
      ])
    })

    it('should work with old format (no teenagers)', () => {
      const params = {
        adults: 2,
        children: 1,
        infants: 0,
        includedGuests: [{
          adults: 1,
          children: 1,
          infants: 0,
        }],
      }
      expect(property.extraGuests.get(params)).to.eql([{
        adults: 1,
        children: 0,
        infants: 0,
      }])
    })
  })

  describe('surcharges', function() {
    const buildParams = (opts = {}) => ({
      nights: 2,
      extraGuests: [[{ adults: 1, children: 1, infants: 1, teenagers: 0 }]],
      extraGuestSurcharge: {
        currency: 'AUD',
        adult_cost: 111,
        adult_amount: 120,
        child_cost: 50,
        child_amount: 60,
        infant_cost: 10,
        infant_amount: 12,
      },
      ...opts,
    })

    it('should return empty state if no extra guests', () => {
      const params = buildParams({
        extraGuests: [],
      })
      const result = property.extraGuests.surcharges(params)
      expect(result).to.eql({
        sell: 0,
        cost: 0,
        applies: false,
        costCurrency: undefined,
        duration: {
          sell: 0,
          cost: 0,
          applies: false,
        },
      })
    })

    it('should return empty state if no extra guest surcharges setup', () => {
      const params = buildParams({ extraGuestSurcharge: undefined })
      const result = property.extraGuests.surcharges(params)
      expect(result).to.eql({
        sell: 0,
        cost: 0,
        applies: false,
        costCurrency: undefined,
        duration: {
          sell: 0,
          cost: 0,
          applies: false,
        },
      })
    })

    it('should return extra guest surcharge values', async() => {
      const params = buildParams()
      const result = property.extraGuests.surcharges(params)
      expect(result).to.eql({
        applies: true,
        cost: 171,
        costCurrency: 'AUD',
        duration: {
          applies: true,
          cost: 342,
          sell: 384,
        },
        sell: 192,
      })
    })

    it('should return the lowest when multiple extraGuest possibilities passed in', async() => {
      const params = buildParams({
        extraGuests: [
          [
            { adults: 1, children: 1, infants: 1, teenagers: 0 },
            { adults: 0, children: 2, infants: 0, teenagers: 0 },
          ],
        ],
      })
      const result = property.extraGuests.surcharges(params)
      expect(result).to.eql({
        applies: true,
        cost: 100,
        costCurrency: 'AUD',
        duration: {
          applies: true,
          cost: 200,
          sell: 240,
        },
        sell: 120,
      })
    })

    it('should return only surcharge', async() => {
      const params = buildParams({
        extraGuests: [
          [
            { adults: 1, children: 1, infants: 1 },
            { adults: 0, children: 2, infants: 0 },
          ],
        ],
        extraGuestSurcharge: {
          adult_amount: 120,
          child_amount: 60,
          infant_amount: 12,
        },
      })
      const result = property.extraGuests.surcharges(params)
      expect(result).to.eql({
        applies: true,
        cost: 0,
        costCurrency: undefined,
        duration: {
          applies: true,
          cost: 0,
          sell: 240,
        },
        sell: 120,
      })
    })

    it('should return correct surcharge after exchange currency', async() => {
      const params = buildParams({
        nights: 7,
        extraGuests: [
          [
            { adults: 1, children: 1, infants: 1, teenagers: 0 },
            { adults: 0, children: 2, infants: 0, teenagers: 0 },
          ],
        ],
        extraGuestSurcharge: {
          adult_amount: 748.78,
          adult_cost: 748.78,
          child_amount: 0,
          infant_amount: 0,
        },
      })
      const result = property.extraGuests.surcharges(params)
      expect(result).to.eql({
        applies: true,
        cost: 748.78,
        costCurrency: undefined,
        duration: {
          applies: true,
          cost: 5241.46,
          sell: 5241,
        },
        sell: 748,
      })
    })

    it('should calculate teenager surcharges correctly', () => {
      const params = buildParams({
        nights: 2,
        extraGuests: [[{ adults: 1, children: 1, infants: 1, teenagers: 2 }]],
        extraGuestSurcharge: {
          currency: 'AUD',
          adult_cost: 111,
          adult_amount: 120,
          child_cost: 50,
          child_amount: 60,
          infant_cost: 10,
          infant_amount: 12,
          teenager_cost: 75,
          teenager_amount: 80,
        },
      })
      const result = property.extraGuests.surcharges(params)
      expect(result).to.eql({
        applies: true,
        cost: 321,
        costCurrency: 'AUD',
        duration: {
          applies: true,
          cost: 642,
          sell: 704,
        },
        sell: 352,
      })
    })

    it('should calculate surcharges without teenager fields', () => {
      const params = {
        nights: 2,
        extraGuests: [[{ adults: 1, children: 1, infants: 1 }]],
        extraGuestSurcharge: {
          currency: 'AUD',
          adult_cost: 111,
          adult_amount: 120,
          child_cost: 50,
          child_amount: 60,
          infant_cost: 10,
          infant_amount: 12,
          // No teenager_amount or teenager_cost
        },
      }
      const result = property.extraGuests.surcharges(params)
      expect(result).to.eql({
        applies: true,
        cost: 171, // Only adult + child + infant costs
        costCurrency: 'AUD',
        duration: {
          applies: true,
          cost: 342,
          sell: 384, // Only adult + child + infant amounts
        },
        sell: 192,
      })
    })
  })
})
