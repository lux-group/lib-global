const { getAirlineName, getAllCarriers } = require('../../src/flights/carriers')
const chai = require('chai')
const expect = chai.expect

describe('Carriers', () => {
  it('should not override name when its not on the override list', () => {
    expect(getAirlineName('VA')).to.eql('Virgin Australia')
  })

  it('should override name when it is on the override list', () => {
    expect(getAirlineName('X9')).to.eql('Avion Express')
  })

  it('should return full list of carriers', () => {
    expect(getAllCarriers().length).to.eql(937)
  })

  it('should return full list of carriers', () => {
    expect(getAllCarriers().length).to.gt(900)
    expect(getAllCarriers().find(c => c.code === 'QF').name).to.eql('Qantas Airways')
  })
})
