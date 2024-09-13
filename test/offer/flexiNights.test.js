const chai = require('chai')
const expect = chai.expect

const { offer: offerLib } = require('../../compiled')

const {
  generateAllOptions,
} = offerLib.flexibleNights

const {
  buildLEOffer,
  buildLEPackageWithLuxPlusPricing,
  buildLEPackageWithOnlyLuxPlusPriceNoNightlyPrice,
  buildLMEOffer,
  buildTAOOffer,
  buildTourOffer,
} = require('../factories/offers/factories')

describe('Offer: Flexible nights', () => {
  describe('Flexible_nights: false', () => {
    it('should return the same prices and duration, when no flexi nights and prices are empty', () => {
      const offerPackage = buildLEOffer().packages[1]
      const result = generateAllOptions(offerPackage)

      expect(result).to.eql([
        {
          packageId: 'a0s0I000007Sj5KQAS',
          extraNights: 0,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '3 nights stay in an upgraded Superior room for two',
          duration: 3,
          prices: [],
        },
      ])
    })

    it('should not return any extra package options and the same prices, when no flexi nights and prices are empty', () => {
      const offerPackage = buildLEOffer().packages[7]
      const result = generateAllOptions(offerPackage)

      expect(result).to.eql([
        {
          packageId: 'a0s0I000007Sj5QQAS',
          extraNights: 0,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in a Classic Room for two',
          duration: 7,
          prices: [],
        },
      ])
    })

    it('should return the package with no flexi nights and with prices', () => {
      const offerPackage = buildLEOffer().packages[0]
      const result = generateAllOptions(offerPackage)

      expect(result).to.eql([
        {
          packageId: 'a0s0I000007Sj5JQAS',
          extraNights: 0,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '3 nights stay in a Classic Room for two',
          duration: 3,
          prices: [{
            currency_code: 'AUD',
            price: 1099,
            lux_plus_price: 0,
            lux_plus_nightly_price: 0,
            value: 2068,
            nightly_price: 0,
            nightly_value: 0,
            margin_aud: 0,
          }],
        },
      ])
    })

    it('should not return any extra package and use the info in the package_option', () => {
      const leOfferPackage = buildLMEOffer().packages[0]
      const leResult = generateAllOptions(leOfferPackage)

      expect(leResult).to.eql([
        {
          packageId: '2c533fd7-85d6-4493-b52a-08fd52a96632',
          extraNights: 0,
          roomTypeId: '7227c6c0-8411-11e8-a9a2-0396cc09a4e4',
          roomRateId: '30192905-0266-47fb-a4f4-62d71dbb8557',
          name: 'Free drinks',
          duration: 1,
          prices: [
            {
              currency_code: 'AUD',
              price: 240,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 300,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
      ])

      const taoOfferPackage = buildTAOOffer().packages[0]
      const taoResult = generateAllOptions(taoOfferPackage)

      expect(taoResult).to.eql([
        {
          packageId: 'a0s0I000005o8d3QAA',
          extraNights: 0,
          roomTypeId: undefined,
          roomRateId: undefined,
          name: '1 Person Quad Share Interior',
          duration: 4,
          prices: [
            {
              currency_code: 'AUD',
              price: 299,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 419,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            }],
        },
      ])

      const tourOfferPackage = buildTourOffer().packages[0]
      const tourResult = generateAllOptions(tourOfferPackage)

      expect(tourResult).to.eql([
        {
          packageId: 'a0s0I000006zVg2QAE',
          extraNights: 0,
          roomTypeId: undefined,
          roomRateId: undefined,
          name: '1 Person Twin Share Balcony Fantastica Low Season',
          duration: 21,
          prices: [
            {
              currency_code: 'AUD',
              price: 5099,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 6168,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
      ])
    })
  })

  describe('Flexible_nights: true', () => {
    it('should add two extra package options, total three package options', () => {
      const offerPackage = buildLEOffer().packages[8]
      const result = generateAllOptions(offerPackage)

      expect(result).to.eql([
        {
          packageId: 'a0s0I000007Sj5RQAS',
          extraNights: 0,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in an upgraded Superior room for two',
          duration: 7,
          prices: [{
            currency_code: 'AUD',
            price: 2899,
            lux_plus_price: 0,
            lux_plus_nightly_price: 0,
            value: 5137,
            nightly_price: 0,
            nightly_value: 0,
            margin_aud: 2000,
          },
          ],
        },
        {
          packageId: 'a0s0I000007Sj5RQAS',
          extraNights: 1,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in an upgraded Superior room for two',
          duration: 8,
          prices: [
            {
              currency_code: 'AUD',
              price: 2899,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 5137,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: 'a0s0I000007Sj5RQAS',
          extraNights: 2,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in an upgraded Superior room for two',
          duration: 9,
          prices: [{
            currency_code: 'AUD',
            price: 2899,
            lux_plus_price: 0,
            lux_plus_nightly_price: 0,
            value: 5137,
            nightly_price: 0,
            nightly_value: 0,
            margin_aud: 0,
          }],
        },
      ])
    })

    it('should add two extra package options, total three package options with correct lux plus pricing and margin', () => {
      const result = generateAllOptions(buildLEPackageWithLuxPlusPricing)

      expect(result).to.eql([
        {
          packageId: 'a0s0I000007Sj5RQAS',
          extraNights: 0,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in an upgraded Superior room for two',
          duration: 7,
          prices: [{
            currency_code: 'AUD',
            price: 2899,
            lux_plus_price: 2500,
            value: 5137,
            nightly_price: 400,
            lux_plus_nightly_price: 350,
            nightly_value: 800,
            margin_aud: 0,
          },
          ],
        },
        {
          packageId: 'a0s0I000007Sj5RQAS',
          extraNights: 1,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in an upgraded Superior room for two',
          duration: 8,
          prices: [
            {
              currency_code: 'AUD',
              price: 3299,
              lux_plus_price: 2850,
              value: 5937,
              nightly_price: 400,
              lux_plus_nightly_price: 350,
              nightly_value: 800,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: 'a0s0I000007Sj5RQAS',
          extraNights: 2,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in an upgraded Superior room for two',
          duration: 9,
          prices: [{
            currency_code: 'AUD',
            price: 3699,
            lux_plus_price: 3200,
            value: 6737,
            nightly_price: 400,
            lux_plus_nightly_price: 350,
            nightly_value: 800,
            margin_aud: 0,
          }],
        },
      ])
    })

    it('should add two extra package options, total three package options with correct lux plus pricing when theres no lux plus nightly price', () => {
      const result = generateAllOptions(buildLEPackageWithOnlyLuxPlusPriceNoNightlyPrice)

      expect(result).to.eql([
        {
          packageId: 'a0s0I000007Sj5RQAS',
          extraNights: 0,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in an upgraded Superior room for two',
          duration: 7,
          prices: [{
            currency_code: 'AUD',
            price: 2899,
            lux_plus_price: 2500,
            value: 5137,
            nightly_price: 400,
            lux_plus_nightly_price: 0,
            nightly_value: 800,
            margin_aud: 2000,
          },
          ],
        },
        {
          packageId: 'a0s0I000007Sj5RQAS',
          extraNights: 1,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in an upgraded Superior room for two',
          duration: 8,
          prices: [
            {
              currency_code: 'AUD',
              price: 3299,
              lux_plus_price: 0,
              value: 5937,
              nightly_price: 400,
              lux_plus_nightly_price: 0,
              nightly_value: 800,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: 'a0s0I000007Sj5RQAS',
          extraNights: 2,
          roomTypeId: '52a04cb0-3e59-11ea-80f2-ad68d677b787',
          roomRateId: '198b69a7-2225-4e8f-b7a4-ebe3f4914274',
          name: '7 nights stay in an upgraded Superior room for two',
          duration: 9,
          prices: [{
            currency_code: 'AUD',
            price: 3699,
            lux_plus_price: 0,
            value: 6737,
            nightly_price: 400,
            lux_plus_nightly_price: 0,
            nightly_value: 800,
            margin_aud: 0,
          }],
        },
      ])
    })

    it('should return three extra package options, total of four package options', () => {
      const offerPackage = buildLMEOffer().packages[2]
      const result = generateAllOptions(offerPackage)

      expect(result).to.eql([
        {
          packageId: 'a0s0T0000006xx6QAA',
          extraNights: 0,
          roomTypeId: '100ebef0-6c1e-11e7-80aa-03af88b051d5',
          roomRateId: '38b1a1d0-b4e4-11ea-8c2f-09e168d100d1',
          name: 'Nightly Rates E2E',
          duration: 1,
          prices: [
            {
              currency_code: 'AUD',
              price: 120,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 200,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: 'a0s0T0000006xx6QAA',
          extraNights: 1,
          roomTypeId: '100ebef0-6c1e-11e7-80aa-03af88b051d5',
          roomRateId: '38b1a1d0-b4e4-11ea-8c2f-09e168d100d1',
          name: 'Nightly Rates E2E',
          duration: 2,
          prices: [
            {
              currency_code: 'AUD',
              price: 120,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 200,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: 'a0s0T0000006xx6QAA',
          extraNights: 2,
          roomTypeId: '100ebef0-6c1e-11e7-80aa-03af88b051d5',
          roomRateId: '38b1a1d0-b4e4-11ea-8c2f-09e168d100d1',
          name: 'Nightly Rates E2E',
          duration: 3,
          prices: [
            {
              currency_code: 'AUD',
              price: 120,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 200,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: 'a0s0T0000006xx6QAA',
          extraNights: 3,
          roomTypeId: '100ebef0-6c1e-11e7-80aa-03af88b051d5',
          roomRateId: '38b1a1d0-b4e4-11ea-8c2f-09e168d100d1',
          name: 'Nightly Rates E2E',
          duration: 4,
          prices: [
            {
              currency_code: 'AUD',
              price: 120,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 200,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            }],
        },
      ])
    })

    it('should return three extra package options, generated from package_options', () => {
      const offerPackage = buildTAOOffer().packages[6]
      const result = generateAllOptions(offerPackage)

      expect(result).to.eql([
        {
          packageId: 'b38d1f09-9937-4808-b96b-e92d5b3b797c',
          extraNights: 0,
          roomTypeId: undefined,
          roomRateId: '4f0352c0-b69d-11ea-89fb-3f31a6d63976',
          name: 'Standard',
          duration: 4,
          prices: [
            {
              currency_code: 'AUD',
              price: 819,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 1029,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            }],
        },
        {
          packageId: 'b38d1f09-9937-4808-b96b-e92d5b3b797c',
          extraNights: 1,
          roomTypeId: undefined,
          roomRateId: '4f0352c0-b69d-11ea-89fb-3f31a6d63976',
          name: 'Standard',
          duration: 5,
          prices: [
            {
              currency_code: 'AUD',
              price: 819,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 1029,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: '51ee2aa2-acdd-4262-ad4b-f8d39406758f',
          extraNights: 0,
          roomTypeId: undefined,
          roomRateId: 'f901b1e0-b69d-11ea-89fb-3f31a6d63976',
          name: 'Standard with inclusions',
          duration: 4,
          prices: [
            {
              currency_code: 'AUD',
              price: 819,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 1029,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: '51ee2aa2-acdd-4262-ad4b-f8d39406758f',
          extraNights: 1,
          roomTypeId: undefined,
          roomRateId: 'f901b1e0-b69d-11ea-89fb-3f31a6d63976',
          name: 'Standard with inclusions',
          duration: 5,
          prices: [
            {
              currency_code: 'AUD',
              price: 819,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 1029,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: 'ddebb810-a89d-42c1-b589-480d59fdd88d',
          extraNights: 0,
          roomTypeId: undefined,
          roomRateId: 'f61874a0-b69d-11ea-89fb-3f31a6d63976',
          name: 'Standard with breakfast',
          duration: 4,
          prices: [
            {
              currency_code: 'AUD',
              price: 819,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 1029,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
        {
          packageId: 'ddebb810-a89d-42c1-b589-480d59fdd88d',
          extraNights: 1,
          roomTypeId: undefined,
          roomRateId: 'f61874a0-b69d-11ea-89fb-3f31a6d63976',
          name: 'Standard with breakfast',
          duration: 5,
          prices: [
            {
              currency_code: 'AUD',
              price: 819,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 1029,
              nightly_price: 0,
              nightly_value: 0,
              margin_aud: 0,
            },
          ],
        },
      ])
    })

    it('should not return any extra package options for tour offers', () => {
      const offerPackage = buildTourOffer().packages[12]
      const result = generateAllOptions(offerPackage)

      expect(result.length).to.eql(1)
      expect(result).to.eql([
        {
          packageId: 'a0s0I000006zVGsQAM',
          extraNights: 0,
          roomTypeId: undefined,
          roomRateId: undefined,
          name: '1 Person Twin Share Interior Fantastica Low Season',
          duration: 21,
          prices: [
            {
              currency_code: 'AUD',
              price: 4599,
              lux_plus_price: 0,
              lux_plus_nightly_price: 0,
              value: 5708,
              nightly_price: 0,
              nightly_value: 0,
            },
          ],
        },
      ])
    })
  })
})
