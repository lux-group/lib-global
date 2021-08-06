const moment = require('moment')
const MockDate = require('mockdate')
const chai = require('chai')
const expect = chai.expect

const { offer: offerLib } = require('../../compiled')

const { checkInCloses } = offerLib.dates
const { OFFER_TYPE_HOTEL, OFFER_TYPE_LAST_MINUTE_HOTEL } = offerLib.constants

describe('checkInCloses', () => {
  beforeEach(() => {
    const currentDate = '2020-07-29 00:22:47'
    MockDate.set(currentDate)
  })

  afterEach(() => {
    MockDate.reset()
  })

  describe('offerType = hotel', () => {
    it('should return if no travel to date', () => {
      expect(checkInCloses(OFFER_TYPE_HOTEL, null, 1, 0)).to.eql(null)
    })

    it('should return if no number of nights', () => {
      expect(checkInCloses(OFFER_TYPE_HOTEL, '2012-01-10', null, 0)).to.eql(
        null,
      )
    })

    it('should return the check in closes date + 1 day', () => {
      expect(checkInCloses(OFFER_TYPE_HOTEL, '2012-01-10', 2, 0)).to.eql(
        '2012-01-09',
      )
    })
  })

  describe('offerType = LME', () => {
    it('should return 7 days from today', () => {
      const travelToDate = moment()
      travelToDate.add(10, 'days')
      const expected = moment()
      expected.add(6, 'days')

      expect(
        checkInCloses(
          OFFER_TYPE_LAST_MINUTE_HOTEL,
          travelToDate.format('YYYY-MM-DD'),
          2,
          600,
        ),
      ).to.eql(expected.format('YYYY-MM-DD'))
    })

    it('should return travel to date if earlier than 7 days days', () => {
      const travelToDate = moment()
      travelToDate.add(10, 'days')
      const expected = moment()
      expected.add(6, 'days')

      expect(
        checkInCloses(
          OFFER_TYPE_LAST_MINUTE_HOTEL,
          travelToDate.format('YYYY-MM-DD'),
          2,
          600,
        ),
      ).to.eql(expected.format('YYYY-MM-DD'))
    })

    it('should return 7 days from today if travelToDate is null', () => {
      const travelToDate = null

      const expected = moment()
      expected.add(6, 'days')

      expect(
        checkInCloses(OFFER_TYPE_LAST_MINUTE_HOTEL, travelToDate, 2, 600),
      ).to.eql(expected.format('YYYY-MM-DD'))
    })
  })
})
