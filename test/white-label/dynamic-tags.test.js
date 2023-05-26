const { expect, spy } = require('chai')
const { replaceTags, replaceTagsMiddleware } = require('../../src/white-label/dynamic-tags')

describe('replaceTags', () => {
  it('Should works when root is a object', () => {
    const object = {
      propWithTag: 'Welcome to {{BrandName}}',
      propWithoutTag: 'Some description',
      propWithTagButNotAllowed: 'Contact us {{BrandName}}',
      propWithInvalidTag: 'This tag must {{disappear}}',
      propBoolean: true,
      propNumber: 2345,
      propObject: {
        nestedPropWithTag: 'Contact for cruises {{CruiseEmail}}'
      },
      propObjectList: [{
        propWithTag: 'Option one {{BrandName}}!',
      }, {
        propWithTag: 'Option two {{BrandName}}!',
        stringList: ['Item one {{SalesEmail}}!', 'Item two {{BrandName}}!']
      }],
    }
    const allowedFields = [
      'propWithTag',
      'propWithoutTag',
      'propWithInvalidTag',
      'propBoolean',
      'propNumber',
      'propObject.nestedPropWithTag',
      'propObjectList.propWithTag',
      'propObjectList.stringList'
    ]

    const res = replaceTags(object, 'luxuryescapes', allowedFields)

    expect(res).to.eql({
      propWithTag: 'Welcome to Luxury Escapes',
      propWithoutTag: 'Some description',
      propWithTagButNotAllowed: 'Contact us {{BrandName}}',
      propWithInvalidTag: 'This tag must ',
      propBoolean: true,
      propNumber: 2345,
      propObject: {
        nestedPropWithTag: 'Contact for cruises cruises@luxuryescapes.com'
      },
      propObjectList: [{
        propWithTag: 'Option one Luxury Escapes!',
      }, {
        propWithTag: 'Option two Luxury Escapes!',
        stringList: ['Item one sales@luxuryescapes.com!', 'Item two Luxury Escapes!']
      }],
    })
  })

  it('Should works when root is a list', () => {
    const object = [
      {
        propWithTag: 'Welcome to {{BrandName}}',
        propWithoutTag: 'Some description',
        propWithTagButNotAllowed: 'Contact us {{BrandName}}',
        propWithInvalidTag: 'This tag must {{disappear}}',
        propBoolean: true,
        propNumber: 2345,
        propObject: {
          nestedPropWithTag: 'Contact for cruises {{CruiseEmail}}'
        },
        propObjectList: [{
          propWithTag: 'Option one {{BrandName}}!',
        }, {
          propWithTag: 'Option two {{BrandName}}!',
          stringList: ['Item one {{SalesEmail}}!', 'Item two {{BrandName}}!']
        }],
      },{
        propWithTag: 'Welcome to {{BrandName}}',
        propWithoutTag: 'Some description',
        propWithTagButNotAllowed: 'Contact us {{BrandName}}',
        propWithInvalidTag: 'This tag must {{disappear}}',
        propBoolean: true,
        propNumber: 2345,
        propObject: {
          nestedPropWithTag: 'Contact for cruises {{CruiseEmail}}'
        },
        propObjectList: [{
          propWithTag: 'Option one {{BrandName}}!',
        }, {
          propWithTag: 'Option two {{BrandName}}!',
          stringList: ['Item one {{SalesEmail}}!', 'Item two {{BrandName}}!']
        }],
      }
    ]
    const allowedFields = [
      'propWithTag',
      'propWithoutTag',
      'propWithInvalidTag',
      'propBoolean',
      'propNumber',
      'propObject.nestedPropWithTag',
      'propObjectList.propWithTag',
      'propObjectList.stringList'
    ]

    const res = replaceTags(object, 'luxuryescapes', allowedFields)

    expect(res).to.eql([
      {
        propWithTag: 'Welcome to Luxury Escapes',
        propWithoutTag: 'Some description',
        propWithTagButNotAllowed: 'Contact us {{BrandName}}',
        propWithInvalidTag: 'This tag must ',
        propBoolean: true,
        propNumber: 2345,
        propObject: {
          nestedPropWithTag: 'Contact for cruises cruises@luxuryescapes.com'
        },
        propObjectList: [{
          propWithTag: 'Option one Luxury Escapes!',
        }, {
          propWithTag: 'Option two Luxury Escapes!',
          stringList: ['Item one sales@luxuryescapes.com!', 'Item two Luxury Escapes!']
        }],
      },{
        propWithTag: 'Welcome to Luxury Escapes',
        propWithoutTag: 'Some description',
        propWithTagButNotAllowed: 'Contact us {{BrandName}}',
        propWithInvalidTag: 'This tag must ',
        propBoolean: true,
        propNumber: 2345,
        propObject: {
          nestedPropWithTag: 'Contact for cruises cruises@luxuryescapes.com'
        },
        propObjectList: [{
          propWithTag: 'Option one Luxury Escapes!',
        }, {
          propWithTag: 'Option two Luxury Escapes!',
          stringList: ['Item one sales@luxuryescapes.com!', 'Item two Luxury Escapes!']
        }],
      }
    ])
  })

  it('Should set default params', () => {
    const object = {
      propWithTag: 'Welcome to {{BrandName}}'
    }

    const res = replaceTags(object, undefined, ['propWithTag'])

    expect(res).to.eql({
      propWithTag: 'Welcome to Luxury Escapes'
    })
  })

  it('Should work when sending to other brands', () => {
    const object = {
      propWithTag: 'Welcome to {{BrandName}}'
    }

    const res = replaceTags(object, 'cudotravel', ['propWithTag'])

    expect(res).to.eql({
      propWithTag: 'Welcome to Cudo'
    })
  })

  it('Should not replace anything when sending invalid brand', () => {
    const object = {
      propWithTag: 'Welcome to {{BrandName}}'
    }

    const res = replaceTags(object, 'invalidbrand', ['propWithTag'])

    expect(res).to.eql({
      propWithTag: 'Welcome to {{BrandName}}'
    })
  })

  it('Should retain tags when requested', () => {
    const object = {
      propWithTag: 'Welcome to {{BrandName}}'
    }

    const res = replaceTags(object, 'luxuryescapes', ['propWithTag'], true)

    expect(res).to.eql({
      propWithTag: 'Welcome to {{BrandName}}'
    })
  })

  it('Should ignore allowed fields that do not exist in the response', () => {
    const object = {
      propWithTag: 'Welcome to {{BrandName}}',
      propObject: {}
    }

    const res = replaceTags(object, 'luxuryescapes', ['propWithTag', 'notExistingPop', 'propObject.notExistingChild', 'notExistingObject.notExistingChild'])

    expect(res).to.eql({
      propWithTag: 'Welcome to Luxury Escapes',
      propObject: {}
    })
  })
})

describe('replaceTagsMiddleware', () => {
  it('works', () => {
    const fields = [
      'aaaaa.bbbbb.ccccc',
      'xxxxx.yyyyy.zzzzz'
    ]

    const result = replaceTagsMiddleware(fields)

    expect(result.length).to.eql(3)
    expect(typeof result).to.eql('function')

    let jsonCount = 0 
    let nextCount = 0  
  
    const req = {
      query: {
        brand: 'luxuryescapes',
        retainDynamicTags: false
      }
    }
    const res = { 
      json: () => jsonCount++,
      statusCode: 200
    }
    const next = () => nextCount++

    result(req, res, next)

    //Check call next function
    expect(nextCount).to.eql(1)

    //Check call original json function
    res.json()
    expect(jsonCount).to.eql(1)
  })
})
