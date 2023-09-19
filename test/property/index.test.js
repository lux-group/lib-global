const chai = require('chai')

const { property } = require('../../compiled')

const expect = chai.expect

describe('Property', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('isUniqueStay', () => {
    it('Must return true for a UNIQUE_STAYS type', async() => {
      const returnData = property.isUniqueStay('Houseboat')

      expect(returnData).to.eql(true)
    })

    it('Must return false for a HOTEL type', async() => {
      const returnData = property.isUniqueStay('Castle')

      expect(returnData).to.eql(false)
    })
  })

  describe('allTypesAndCategories', () => {
    it('Must return a map', async() => {
      const returnData = property.allTypesAndCategories
      expect(returnData).to.have.all.keys('HOTEL', 'UNIQUE_STAYS', 'RENTAL')
    })
  })

  describe('allCategories', () => {
    it('Must return a massive array', async() => {
      const returnData = property.allCategories
      expect(returnData).to.have.length(23)
    })
  })

  describe('allSubCategories', () => {
    it('Must return a massive array', async() => {
      const returnData = property.allSubCategories
      expect(returnData).to.have.length(1)
    })
  })

  describe('allTypes', () => {
    it('Must return all Types', async() => {
      const returnData = property.allTypes
      expect(returnData).to.eql(['HOTEL', 'UNIQUE_STAYS', 'RENTAL'])
    })
  })
})
