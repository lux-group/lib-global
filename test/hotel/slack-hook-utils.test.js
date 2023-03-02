const chai = require('chai')
const expect = chai.expect

const {
  hotel,
} = require('../../compiled')

describe('slack notifications', () => {
  const mockSlackHookDetails = {
    channelManager: 'Test Channel Manager',
    channelSupplierId: '12345',
    channelAriType: 'Test ARI Type',
    supplierReservationId: '67890',
    hotelId: 'Test Hotel ID',
    offerTitle: 'Test Offer Title',
    offerId: 'Test Offer ID',
    rateId: 'Test Rate ID',
    roomId: 'Test Room ID',
    roomRateId: 'Test Room Rate ID',
    propertyId: 'Test Property ID',
    propertyName: 'Test Property Name',
    bookingNumber: 'Test Booking Number',
    checkIn: '2023-03-01',
    checkOut: '2023-03-05',
    costCurrency: 'USD',
    costAmount: 100.00,
    adults: 2,
    children: 2,
    lengthOfStay: 4,
    ariType: 'Test ARI Type',
    leadDayId: 'Test Lead Day ID',
    other: 'Test Other',
  }
  describe('buildNotificationPayload', () => {
    it('should build a valid Slack webhook payload', () => {
      const payload = hotel.buildNotificationPayload('Test Text', mockSlackHookDetails)

      expect(payload.blocks).to.have.length(3)

      expect(payload.blocks[0]).to.deep.equal({
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Test Channel Manager Alert!',
        },
      })

      expect(payload.blocks[1]).to.deep.equal({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Test Text',
        },
      })

      expect(payload.blocks[2]).to.deep.equal({
        type: 'section',
        fields: [
          { text: '*Channel Manager*: Test Channel Manager', type: 'mrkdwn' },
          { text: '*Channel Supplier Id*: 12345', type: 'mrkdwn' },
          { text: '*Channel Ari Type*: Test ARI Type', type: 'mrkdwn' },
          { text: '*Supplier Reservation Id*: 67890', type: 'mrkdwn' },
          { text: '*Hotel Id*: Test Hotel ID', type: 'mrkdwn' },
          { text: '*Offer Title*: Test Offer Title', type: 'mrkdwn' },
          { text: '*Offer Id*: Test Offer ID', type: 'mrkdwn' },
          { text: '*Rate Id*: Test Rate ID', type: 'mrkdwn' },
          { text: '*Room Id*: Test Room ID', type: 'mrkdwn' },
          { text: '*Room Rate Id*: Test Room Rate ID', type: 'mrkdwn' },
          { text: '*Property Id*: Test Property ID', type: 'mrkdwn' },
          { text: '*Property Name*: Test Property Name', type: 'mrkdwn' },
          { text: '*Booking Number*: Test Booking Number', type: 'mrkdwn' },
          { text: '*Check In*: 2023-03-01', type: 'mrkdwn' },
          { text: '*Check Out*: 2023-03-05', type: 'mrkdwn' },
          { text: '*Cost Currency*: USD', type: 'mrkdwn' },
          { text: '*Cost Amount*: 100', type: 'mrkdwn' },
          { text: '*Adults*: 2', type: 'mrkdwn' },
          { text: '*Children*: 2', type: 'mrkdwn' },
          { text: '*Length Of Stay*: 4', type: 'mrkdwn' },
          { text: '*Ari Type*: Test ARI Type', type: 'mrkdwn' },
          { text: '*Lead Day Id*: Test Lead Day ID', type: 'mrkdwn' },
          { text: '*Other*: Test Other', type: 'mrkdwn' },
        ],
      })
    })
  })
})
