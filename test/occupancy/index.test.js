const chai = require('chai')

const { occupancy } = require('../../compiled')

const expect = chai.expect

describe('Occupancy', () => {
  describe('get()', () => {
    it('get old variant of occupancy', () => {
      expect(occupancy.get('2-0-0')).to.eql([{
        adults: 2,
        children: 0,
        infants: 0,
        teenagers: 0,
        childrenAges: [],
      }])
    })

    it('get old variant of occupancy with multiple entries', () => {
      expect(occupancy.get('2-0-0,1-3-0')).to.eql([
        {
          adults: 2,
          children: 0,
          infants: 0,
          teenagers: 0,
          childrenAges: [],
        },
        {
          adults: 1,
          children: 3,
          infants: 0,
          teenagers: 0,
          childrenAges: [],
        },
      ])
    })

    it('get occupancy with ages', () => {
      expect(occupancy.get('2-12,1')).to.eql([
        {
          adults: 2,
          children: 2,
          infants: 0,
          teenagers: 0,
          childrenAges: [12, 1],
        },
      ])
    })

    it('get occupancy without ages', () => {
      expect(occupancy.get('2')).to.eql([
        {
          adults: 2,
          children: 0,
          infants: 0,
          teenagers: 0,
          childrenAges: [],
        },
      ])
    })

    it('should handle get() including teenagers', async() => {
      expect(occupancy.get('2-1-1-3')).to.eql([{
        adults: 2,
        children: 1,
        infants: 1,
        teenagers: 3,
        childrenAges: [],
      }])
    })

    it('match', async() => {
      expect(occupancy.match('2-0-0')).to.eql(true)
      expect(occupancy.match('2-1,2')).to.eql(true)
      expect(occupancy.match('2-12')).to.eql(true)
      expect(occupancy.match('2-1--2')).to.eql(false)
      expect(occupancy.match('2,1,2')).to.eql(false)
    })

    it('toString', async() => {
      expect(occupancy.toString({
        adults: 2,
        children: 2,
        infants: 0,
        childrenAges: [12, 1],
      })).to.eql('2-12,1')
      expect(occupancy.toString({
        adults: 4,
        children: 2,
        infants: 1,
        childrenAges: [],
      })).to.eql('4-2-1')
    })

    describe('occupancy.strummerMatcher', () => {
      it('allows an valid occupancy', () => {
        expect(occupancy.strummerMatcher.match('', '2')).to.eql(undefined)
      })

      it('occupancy is not required', () => {
        expect(occupancy.strummerMatcher.match('', '')).to.eql(undefined)
      })

      it('allows multiple occupancies', () => {
        expect(occupancy.strummerMatcher.match('', ['2', '3-1'])).to.eql(undefined)
      })

      it('detects an invalid occupancy', () => {
        expect(occupancy.strummerMatcher.match('', 'x')).to.eql('Invalid occupancy format')
      })

      it('detects an invalid occupancy in an array', () => {
        expect(occupancy.strummerMatcher.match('', ['2', 'x', '3-1'])).to.eql('Invalid occupancy format')
      })
    })

    describe('occupancy.strummerMatcherRequired', () => {
      it('allows an valid occupancy', () => {
        expect(occupancy.strummerMatcherRequired.match('', '2')).to.eql(undefined)
      })

      it('occupancy is required', () => {
        expect(occupancy.strummerMatcherRequired.match('', '')).to.eql('Occupancy is required')
      })

      it('allows multiple occupancies', () => {
        expect(occupancy.strummerMatcherRequired.match('', ['2', '3-1'])).to.eql(undefined)
      })

      it('detects an invalid occupancy', () => {
        expect(occupancy.strummerMatcherRequired.match('', 'x')).to.eql('Invalid occupancy format')
      })

      it('detects an invalid occupancy in an array', () => {
        expect(occupancy.strummerMatcherRequired.match('', ['2', 'x', '3-1'])).to.eql('Invalid occupancy format')
      })
    })
  })

  describe('item context: countOccupants', function() {
    it('should get occupants without ages', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          children: 1,
          infants: 1,
          childrenAges: [],
        },
      })

      expect(occupants).to.eql({
        adults: 2,
        children: 1,
        infants: 1,
        teenagers: 0,
        childrenAges: [],
      })
    })

    it('should get occupants with limiting by ages', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [0, 7],
        },
      })

      expect(occupants).to.eql({
        adults: 2,
        children: 2,
        infants: 0,
        teenagers: 0,
        childrenAges: [0, 7],
      })
    })

    it('should get occupants with limiting by ages and property ages limits', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [0, 7],
        },
        maxChildAge: 12,
        maxInfantAge: 3,
      })

      expect(occupants).to.eql({
        adults: 2,
        children: 1,
        infants: 1,
        teenagers: 0,
        childrenAges: [0, 7],
      })
    })

    it('should get occupants with limiting by ages and property ages limits', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [0, 7],
        },
        maxChildAge: 12,
        maxInfantAge: 0,
      })

      expect(occupants).to.eql({
        adults: 2,
        children: 1,
        infants: 1,
        teenagers: 0,
        childrenAges: [0, 7],
      })
    })

    it('should get occupants with limiting by ages and property ages limits', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [0, 7],
        },
        maxChildAge: '',
        maxInfantAge: null,
      })

      expect(occupants).to.eql({
        adults: 2,
        children: 2,
        infants: 0,
        teenagers: 0,
        childrenAges: [0, 7],
      })
    })

    it('should get occupants with extra adults', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [0, 13],
        },
        maxChildAge: 12,
        maxInfantAge: 3,
      })

      expect(occupants).to.eql({
        adults: 3,
        children: 0,
        infants: 1,
        teenagers: 0,
        childrenAges: [0],
      })
    })

    it('should get occupants with infants', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [0],
        },
        maxChildAge: 0,
        maxInfantAge: 0,
      })

      expect(occupants).to.eql({
        adults: 2,
        children: 0,
        infants: 1,
        teenagers: 0,
        childrenAges: [0],
      })
    })

    it('should get occupants with infants and children', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [0, 2],
        },
        maxChildAge: 0,
        maxInfantAge: 0,
      })

      expect(occupants).to.eql({
        adults: 2,
        children: 1,
        infants: 1,
        teenagers: 0,
        childrenAges: [0, 2],
      })
    })

    it('should correctly identify teenagers when ages fall between maxChildAge and maxTeenagerAge', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [7, 13, 15, 17],
        },
        maxChildAge: 12,
        maxTeenagerAge: 17,
        maxInfantAge: 3,
      })

      expect(occupants).to.eql({
        adults: 2,
        children: 1,
        infants: 0,
        teenagers: 3,
        childrenAges: [7],
      })
    })

    it('should count people above maxTeenagerAge as adults', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [7, 13, 15, 17],
        },
        maxChildAge: 12,
        maxTeenagerAge: 14,
        maxInfantAge: 3,
      })

      expect(occupants).to.eql({
        adults: 4,
        children: 1,
        infants: 0,
        teenagers: 1,
        childrenAges: [7],
      })
    })

    it('should default teenagers to 0 when not provided', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          children: 1,
          infants: 1,
          childrenAges: [],
        },
        maxChildAge: 12,
        maxTeenagerAge: 17,
        maxInfantAge: 3,
      })

      expect(occupants).to.eql({
        adults: 2,
        children: 1,
        infants: 1,
        teenagers: 0,
        childrenAges: [],
      })
    })

    it('should handle null/zero maxTeenagerAge correctly', async function() {
      const occupants = occupancy.countOccupants({
        occupancy: {
          adults: 2,
          childrenAges: [7, 13, 15],
        },
        maxChildAge: 12,
        maxTeenagerAge: null,
        maxInfantAge: 3,
      })

      expect(occupants).to.eql({
        adults: 4,
        children: 1,
        infants: 0,
        teenagers: 0,
        childrenAges: [7],
      })
    })
  })
})
