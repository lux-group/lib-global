const chai = require('chai')

const { vendor } = require('../../compiled')

const expect = chai.expect

describe('Vendor', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('requiresTravellerDetails', () => {
    it('Must return true', async () => {

        const returnData = vendor.requiresTravellerDetails('00128000018BZkIAAW')

        expect(returnData).to.eql(true)
    })

    it('Must return false', async () => {

        const returnData = vendor.requiresTravellerDetails('192837193287')

        expect(returnData).to.eql(false)
    })
  })
})
