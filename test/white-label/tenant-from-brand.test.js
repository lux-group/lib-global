const { expect } = require('chai')
const tenantFromBrand = require('../../src/white-label/tenant-from-brand')

describe('tenantFromBrand', () => {
  it("should return 'lux' for specific arguments", () => {
    const args = [
      'cudo', 'cudotravel', 'treatme', 'treatmetravel',
      'deals', 'dealstravel', 'lebusinesstraveller', 'lux',
    ]
    expect(args.every((a) => tenantFromBrand(a) === 'lux')).to.eql(true)
  })

  it("should return 'scoopon' for specific arguments", () => {
    const args = [
      'scoopontravel', 'scooponexperience', 'scoopon',
    ]
    expect(args.every((a) => tenantFromBrand(a) === 'scoopon')).to.eql(true)
  })

  it("should return 'led_admin' for specific arguments", () => {
    const args = [
      'ledvendor', 'led_admin',
    ]
    expect(args.every((a) => tenantFromBrand(a) === 'led_admin')).to.eql(true)
  })

  it("should return 'yidu' when given 'yidu' as an argument", () => {
    expect(tenantFromBrand('yidu')).to.eql('yidu')
  })

  it("should return 'zoomzoom' when given 'zoomzoom' as an argument", () => {
    expect(tenantFromBrand('yidu')).to.eql('yidu')
  })

  it("should return 'kogantravel' when given 'kogantravel' as an argument", () => {
    expect(tenantFromBrand('kogantravel')).to.eql('kogantravel')
  })

  it("should return 'leagenthub' when given 'leagenthub' as an argument", () => {
    expect(tenantFromBrand('leagenthub')).to.eql('leagenthub')
  })

  it("should return 'lux' for unrecognized arguments or brands", () => {
    const args = [
      'test', 'foo', 'bar', undefined, null,
    ]
    expect(args.every((a) => tenantFromBrand(a) === 'lux')).to.eql(true)
  })

  it("should return 'lux' when the argument is undefined", () => {
    expect(tenantFromBrand(undefined)).to.eql('lux')
  })

  it("should return 'lux' when the argument is null", () => {
    expect(tenantFromBrand(null)).to.eql('lux')
  })
})
