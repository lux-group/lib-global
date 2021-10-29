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
        childrenAges: [],
      }])
    })

    it('get old variant of occupancy with multiple entries', () => {
      expect(occupancy.get('2-0-0,1-3-0')).to.eql([
        {
          adults: 2,
          children: 0,
          infants: 0,
          childrenAges: [],
        },
        {
          adults: 1,
          children: 3,
          infants: 0,
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
          childrenAges: [],
        },
      ])
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
  })
})
