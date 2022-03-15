const chai = require('chai')
const MockDate = require('mockdate')

const { calendar } = require('../../compiled')

const expect = chai.expect

describe('Calendar', () => {
  beforeEach(() => {
    const currentDate = '2022-01-31 00:22:47'
    MockDate.set(currentDate)
  })

  afterEach(() => {
    MockDate.reset()
  })

  describe('getStartDate()', () => {
    it('get return current date', () => {
      expect(calendar.getStartDate()).to.eql('2022-01-31')
    })

    it('get return min date', () => {
      expect(calendar.getStartDate('2022-01-30')).to.eql('2022-01-30')
    })

    it('get return travelFrom date', () => {
      expect(calendar.getStartDate('2022-01-25', '2022-01-28')).to.eql('2022-01-28')
    })

    it('get return travelFrom date if non setup min date', () => {
      expect(calendar.getStartDate(undefined, '2022-01-28')).to.eql('2022-01-28')
    })
  })

  describe('getMaxCheckInCloseDate()', () => {
    it('get return default max date', () => {
      expect(calendar.getMaxCheckInCloseDate()).to.eql('2023-07-31')
    })

    it('get return max date is limited by checkInCloses', () => {
      expect(calendar.getMaxCheckInCloseDate('2022-03-28')).to.eql('2022-03-28')
    })

    it('get return max date is limited by CEILING_YEARS', () => {
      expect(calendar.getMaxCheckInCloseDate('2026-03-28')).to.eql('2025-01-31')
    })
  })

  describe('getDateFloorOffset()', () => {
    it('get return default date floor offset', () => {
      expect(calendar.getDateFloorOffset({
        timezoneOffset: 0,
        dateFloorOffset: 2,
        hourOfDayThreshold: 0,
        enquiryType: 'customer',
      })).to.eql(2)
    })

    it('get return zero date floor offset', () => {
      expect(calendar.getDateFloorOffset({
        timezoneOffset: 600,
        dateFloorOffset: 0,
        hourOfDayThreshold: 15,
        enquiryType: 'customer',
      })).to.eql(0)
    })

    it('get return one date floor offset', () => {
      MockDate.set('2022-01-31 12:22:47')
      expect(calendar.getDateFloorOffset({
        timezoneOffset: 600,
        dateFloorOffset: 0,
        hourOfDayThreshold: 15,
        enquiryType: 'customer',
      })).to.eql(1)
    })

    it('get return 0 date floor offset for admin', () => {
      expect(calendar.getDateFloorOffset({
        timezoneOffset: 0,
        dateFloorOffset: 2,
        hourOfDayThreshold: 0,
        enquiryType: 'admin',
      })).to.eql(0)
    })
  })

  describe('getMonthsToRequest()', () => {
    it('get return 14 month', () => {
      MockDate.set('2022-01-31 12:22:47')
      expect(calendar.getMonthsToRequest(0, '2023-02-28')).to.eql(14)
    })

    it('get return 16 month', () => {
      MockDate.set('2022-01-31 12:22:47')
      expect(calendar.getMonthsToRequest(0, '2023-04-30')).to.eql(16)
    })
  })
})
