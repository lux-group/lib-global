const chai = require('chai')

const { environment } = require('../../compiled')

const expect = chai.expect

describe('Environment', () => {
    it('should work', () => {
        expect(environment.PRODUCTION).to.eql('production')
    })
})
