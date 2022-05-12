const chai = require('chai')

const { property } = require('../../compiled')

const expect = chai.expect

describe('Property', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('defaultTypeForCategory', () => {
    it('Must return a HOTEL type', async() => {
      const returnData = property.defaultTypeForCategory('Castle')

      expect(returnData).to.eql('HOTEL')
    })

    it('Must return a UNIQUE_STAYS type', async() => {
      const returnData = property.defaultTypeForCategory('Houseboat')

      expect(returnData).to.eql('UNIQUE_STAYS')
    })

    it('Must return a null for unknown category', async() => {
      const returnData = property.defaultTypeForCategory('blahblahblah')

      expect(returnData).to.eql(null)
    })
  })

  describe('allTypesAndCategories', () => {
    it('Must return a map', async() => {
      const returnData = property.allTypesAndCategories
      expect(returnData).to.have.all.keys('HOTEL', 'UNIQUE_STAYS')
    })
  })

  describe('allCategories', () => {
    it('Must return a massive array', async() => {
      const returnData = property.allCategories
      expect(returnData).to.have.length(25)
    })
  })

  describe('allTypes', () => {
    it('Must return all Types', async() => {
      const returnData = property.allTypes
      expect(returnData).to.eql(['HOTEL', 'UNIQUE_STAYS'])
    })
  })
})
