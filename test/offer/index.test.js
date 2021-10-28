const chai = require('chai')

const { offer } = require('../../compiled')

const expect = chai.expect

const {
  getCountsString,
  getFromPackages,
  getCounts,
} = offer.duration

describe('Offer', () => {
  describe('getCounts()', () => {
    it('works for one night count', () => {
      const packages = [{ number_of_nights: 3 }]

      expect(getCounts(packages, 'number_of_nights')).to.eql([3])
    })

    it('works for one night count', () => {
      const packages = [{ number_of_nights: 3 }, { number_of_nights: 4 }]

      expect(getCounts(packages, 'number_of_nights')).to.eql([3, 4])
    })
  })

  describe('getCountsString()', () => {
    it('works for one night count', () => {
      const packages = [{ number_of_nights: 3 }]

      expect(getCountsString(packages, 'number_of_nights')).to.eql(
        '3'
      )
    })

    it('works for one night count', () => {
      const packages = [{ number_of_nights: 3 }, { number_of_nights: 3 }]

      expect(getCountsString(packages, 'number_of_nights')).to.eql(
        '3'
      )
    })

    it('works for one night count', () => {
      const packages = [{ number_of_nights: 3 }, { number_of_nights: 3 }]

      expect(getCountsString(packages, 'number_of_nights')).to.eql(
        '3'
      )
    })

    it('works for two night counts', () => {
      const packages = [{ number_of_nights: 3 }, { number_of_nights: 5 }]

      expect(getCountsString(packages, 'number_of_nights')).to.eql(
        '3 or 5'
      )
    })

    it('works for more than two night counts', () => {
      const packages = [
        { number_of_nights: 1 },
        { number_of_nights: 3 },
        { number_of_nights: 5 },
        { number_of_nights: 7 },
      ]

      expect(getCountsString(packages, 'number_of_nights')).to.eql(
        '1, 3, 5 or 7'
      )
    })

    it('works for number_of_days', () => {
      const packages = [
        { number_of_days: 1 },
        { number_of_days: 3 },
        { number_of_days: 5 },
        { number_of_days: 7 },
      ]

      expect(getCountsString(packages, 'number_of_days')).to.eql(
        '1, 3, 5 or 7'
      )
    })
  })

  describe('getFromPackages()', () => {
    it('works for one night one count', () => {
      const packages = [{ number_of_nights: 1 }]
      const offer = { type: 'hotel' }

      expect(getFromPackages(packages, offer.type)).to.eql('1 Night')
    })

    it('works for two nights one counts', () => {
      const packages = [{ number_of_nights: 2 }]
      const offer = { type: 'hotel' }

      expect(getFromPackages(packages, offer.type)).to.eql('2 Nights')
    })

    it('works for nights two counts', () => {
      const packages = [{ number_of_nights: 2 }, { number_of_nights: 3 }]
      const offer = { type: 'hotel' }

      expect(getFromPackages(packages, offer.type)).to.eql('2 or 3 Nights')
    })

    it('works for nights many counts', () => {
      const packages = [
        { number_of_nights: 2 },
        { number_of_nights: 3 },
        { number_of_nights: 5 },
      ]
      const offer = { type: 'hotel' }

      expect(getFromPackages(packages, offer.type)).to.eql(
        '2, 3 or 5 Nights'
      )
    })

    it('works for one day one count', () => {
      const packages = [{ number_of_days: 1 }]
      const offer = { type: 'tour' }

      expect(getFromPackages(packages, offer.type)).to.eql('1 Day')
    })

    it('works for two days one counts', () => {
      const packages = [{ number_of_days: 2 }]
      const offer = { type: 'tour' }

      expect(getFromPackages(packages, offer.type)).to.eql('2 Days')
    })

    it('works for days two counts', () => {
      const packages = [{ number_of_days: 1 }, { number_of_days: 2 }]
      const offer = { type: 'tour' }

      expect(getFromPackages(packages, offer.type)).to.eql('1 or 2 Days')
    })

    it('works for days many counts', () => {
      const packages = [
        { number_of_days: 1 },
        { number_of_days: 2 },
        { number_of_days: 5 },
      ]
      const offer = { type: 'tour' }

      expect(getFromPackages(packages, offer.type)).to.eql(
        '1, 2 or 5 Days'
      )
    })

    it('works for days many counts cruises', () => {
      const packages = [
        { number_of_days: 1 },
        { number_of_days: 2 },
        { number_of_days: 5 },
      ]
      const offer = {
        type: 'tour',
        holiday_types: ['Cruises'],
      }

      expect(getFromPackages(packages, offer.type, offer.holiday_types)).to.eql(
        '1, 2 or 5 Days'
      )
    })
  })

  describe("calculateTaxAmount()", function () {
    it("returns the tax is calculated by percentage and type per night", function () {
      expect(
        offer.pricing.calculateTaxAmount({
          nights: 1,
          total: 102,
          taxesAndFees: [{ name: "Test", unit: "percentage", value: 10 }],
        })
      ).to.eql(10)

      expect(
        offer.pricing.calculateTaxAmount({
          nights: 5,
          total: 102 * 5,
          taxesAndFees: [{ name: "Test", unit: "percentage", value: 10 }],
        })
      ).to.eql(51)
    })

    it("returns the tax is calculated by amount and type per night", function () {
      expect(
        offer.pricing.calculateTaxAmount({
          nights: 2,
          total: 100 * 2,
          taxesAndFees: [{ name: "Test", unit: "amount", value: 10 }],
        })
      ).to.eql(20)
    })

    it("returns the tax is calculated by percentage and type per stay", function () {
      expect(
        offer.pricing.calculateTaxAmount({
          nights: 5,
          total: 100 * 5,
          taxesAndFees: [{ name: "Test", unit: "percentage", value: 10, type: "stay" }],
        })
      ).to.eql(50)
    })

    it("returns the tax is calculated by amount and type per stay", function () {
      expect(
        offer.pricing.calculateTaxAmount({
          nights: 5,
          total: 100 * 5,
          taxesAndFees: [{ name: "Test", unit: "amount", value: 100, type: "stay" }],
        })
      ).to.eql(100)
    })

    it("returns the tax is calculated by percentage and type stay - per person", function () {
      expect(
        offer.pricing.calculateTaxAmount({
          nights: 5,
          total: 100 * 5,
          taxesAndFees: [{ name: "Test", unit: "percentage", value: 5, type: "stay", per_person: true }],
          occupancies: [{
            adults: 5,
          }],
        })
      ).to.eql(125)
    })

    it("returns the tax is calculated by amount and type stay - per person", function () {
      expect(
        offer.pricing.calculateTaxAmount({
          nights: 5,
          total: 100 * 5,
          taxesAndFees: [{ name: "Test", unit: "amount", value: 5, type: "stay", per_person: true }],
          occupancies: [{
            adults: 5,
          }],
        })
      ).to.eql(25)
    })

    it("returns the tax is calculated by percentage and type night - per person", function () {
      expect(
        offer.pricing.calculateTaxAmount({
          nights: 5,
          total: 100 * 5,
          taxesAndFees: [{ name: "Test", unit: "percentage", value: 5, type: "night", per_person: true }],
          occupancies: [{
            adults: 5,
          }],
        })
      ).to.eql(125)
    })

    it("returns the tax is calculated by amount and type night - per person", function () {
      expect(
        offer.pricing.calculateTaxAmount({
          nights: 5,
          total: 100 * 5,
          taxesAndFees: [{ name: "Test", unit: "amount", value: 5, type: "night", per_person: true }],
          occupancies: [{
            adults: 5,
          }],
        })
      ).to.eql(125)
    })
  })
})
