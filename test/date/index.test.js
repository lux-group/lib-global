const chai = require('chai')
const MockDate = require('mockdate')

const { date } = require('../../compiled')

const expect = chai.expect

describe('Date', () => {
  beforeEach(() => {
    const currentDate = '2019-12-22T23:59:00.000Z'
    MockDate.set(currentDate)
  })

  afterEach(() => {
    MockDate.reset()
  })

  describe('getDays', function() {
    it('should get pool of days', function() {
      const result = date.getDays(new Date('2020-10-03'), new Date('2020-10-07'))

      expect(result.length).to.equal(5)
      expect(result[0].toISOString()).to.equal('2020-10-03T00:00:00.000Z')
      expect(result[1].toISOString()).to.equal('2020-10-04T00:00:00.000Z')
      expect(result[2].toISOString()).to.equal('2020-10-05T00:00:00.000Z')
      expect(result[3].toISOString()).to.equal('2020-10-06T00:00:00.000Z')
      expect(result[4].toISOString()).to.equal('2020-10-07T00:00:00.000Z')
    })

    it('should get pool of days excluding end date', function() {
      const result = date.getDays(new Date('2020-10-03'), new Date('2020-10-07'), false)

      expect(result.length).to.equal(4)
      expect(result[0].toISOString()).to.equal('2020-10-03T00:00:00.000Z')
      expect(result[1].toISOString()).to.equal('2020-10-04T00:00:00.000Z')
      expect(result[2].toISOString()).to.equal('2020-10-05T00:00:00.000Z')
      expect(result[3].toISOString()).to.equal('2020-10-06T00:00:00.000Z')
    })
  })

  describe('addDays', function() {
    it('should add days', function() {
      const resultOneDay = date.addDays(new Date('2020-10-03'), 1)
      const resultTwoDay = date.addDays(new Date('2020-10-03'), 2)

      expect(resultOneDay.toISOString()).to.equal('2020-10-04T00:00:00.000Z')
      expect(resultTwoDay.toISOString()).to.equal('2020-10-05T00:00:00.000Z')
    })
  })

  describe('subDays', function() {
    it('should subtract days', function() {
      const resultOneDay = date.subDays(new Date('2020-10-03'), 1)
      const resultTwoDay = date.subDays(new Date('2020-10-03'), 2)

      expect(resultOneDay.toISOString()).to.equal('2020-10-02T00:00:00.000Z')
      expect(resultTwoDay.toISOString()).to.equal('2020-10-01T00:00:00.000Z')
    })
  })

  describe('diffInDays', function() {
    it('should diff between dates', function() {
      expect(date.diffInDays(new Date('2020-10-03'), new Date('2020-10-04'))).to.equal(1)
      expect(date.diffInDays(new Date('2020-10-03'), new Date('2020-10-05'))).to.equal(2)
      expect(date.diffInDays(new Date('2020-10-03'), new Date('2020-11-03'))).to.equal(31)
    })
  })

  describe('format', function() {
    it('should handle date format: yy-m-d', () => {
      expect(date.format(new Date('2019-12-22T23:59:00.000Z'), 'yy-m-d')).to.deep.equal('19-12-23')
    })

    it('should handle date format: yyyy-mm-dd', () => {
      expect(date.format(new Date('2019-12-22T23:59:00.000Z'), 'yyyy-mm-dd')).to.deep.equal('2019-12-23')
    })

    it('should handle date format: ddd, dd mmm, yyyy - h:MM:sstt', () => {
      expect(date.format(new Date('2019-12-22T23:59:00.000Z'), 'ddd, dd mmm, yyyy - h:MM:sstt')).to.deep.equal('Mon, 23 Dec, 2019 - 1:59:00am')
    })

    it('should handle date converting timezone', () => {
      const d = date.convertTZ(new Date('2021-07-16T21:00:00.000Z'), 'Australia/Sydney')

      expect(date.format(d, 'ddd, dd mmm, yyyy - h:MM:sstt')).to.deep.equal('Sat, 17 Jul, 2021 - 7:00:00am')
    })

    it('should handle date converting timezone DST', () => {
      const d = date.convertTZ(new Date('2021-11-16T21:00:00.000Z'), 'Australia/Sydney')

      expect(date.format(d, 'ddd, dd mmm, yyyy - h:MM:sstt')).to.deep.equal('Wed, 17 Nov, 2021 - 8:00:00am')
    })
  })
})
