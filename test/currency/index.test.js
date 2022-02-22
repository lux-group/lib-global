const chai = require('chai')

const { currency } = require('../../compiled')

const expect = chai.expect

describe('Currency', () => {
  describe('addDollarType()', () => {
    it('adds the dollar type, if the formatted amount has a dollar sign', () => {
      expect(currency.addDollarType('$50', 'AUD')).to.eql('A$50')
      expect(currency.addDollarType('$50', 'USD')).to.eql('US$50')
    })
    it('works with negative amounts', () => {
      expect(currency.addDollarType('-$50', 'AUD')).to.eql('-A$50')
    })

    it('does nothing for non-dollar currencies', () => {
      expect(currency.addDollarType('€50', 'EUR')).to.eql('€50')
    })

    it('does nothing for unknown dollar types', () => {
      expect(currency.addDollarType('$50', 'FOO')).to.eql('$50')
    })
  })
})
