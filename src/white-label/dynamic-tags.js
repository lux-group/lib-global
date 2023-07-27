const mustache = require('mustache')
const { dynamicValuesSource } = require('./constants')

/**
 * Replaced all tags found in allowed fields from any object
 *
 * @param {any} object - Any object or list containing dynamic content to be replaced
 * @param {string} brand - Brand utilized for retrieving dynamic values
 * @param {string[]} allowedFields - List of strings representing paths to the found fields that can utilize dynamic tags
 * @param {boolean} isRetainingTags - Boolean to prevent tag replacement
 *
 * @returns object with tags replaced
 *
 * @example:
 * for object:
 * {
 *  someProp: [
 *    { fieldWithTag: 'Welcome to {{BrandName}}'},
 *    { fieldWithTag: 'Contact us {{SalesEmail}}'}
 *  ]
 * }
 *
 * use allowedFields like: ['someProp.fieldWithTag']
 *
 * Output:
 * {
 *  someProp: [
 *    { fieldWithTag: 'Welcome to Luxury Escapes'},
 *    { fieldWithTag: 'Contact us sales@luxuryescapes.com'}
 *  ]
 * }
 *
 */
const replaceTags = (object, brand = 'luxuryescapes', allowedFields = [], isRetainingTags = false) => {
  const tagReplacements = dynamicValuesSource[brand]

  if (isRetainingTags || !tagReplacements || !allowedFields.length) return object

  const replaceTagsRecursively = (object, keys) => {
    try {
      if (Array.isArray(object)) {
        object.forEach((item) => replaceTagsRecursively(item, keys))
      } else {
        const [key, ...nextKeys] = keys
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          if (nextKeys.length) {
            replaceTagsRecursively(object[key], nextKeys)
          } else {
            replaceOnItem(object, key)
          }
        }
      }
    } catch {}
  }

  const replaceOnStringItem = (object, key) => {
    if (typeof object[key] == 'string')
    { object[key] = mustache.render(object[key], tagReplacements) }
  }

  const replaceOnItem = (object, key) => {
    if (Array.isArray(object[key])) {
      for (let i = 0; i < object[key].length; i++) {
        replaceOnStringItem(object[key], i)
      }
    }
    else
    { replaceOnStringItem(object, key) }
  }

  allowedFields.forEach(async keyString => replaceTagsRecursively(object, keyString.split('.')))

  return object
}

/**
 * Middleware to replace dynamic tags in the response
 *
 * @param allowedFields - List of strings representing paths to the found fields that can utilize dynamic tags
 *
 * @returns - middleware function
 *
 * @example
 * //Add this function to your routing module for the endpoint that should provide dynamic content.
 * handlers: [
 *  replaceTagsMiddleware(['result.finePrint.description']),
 *  controller.yourControllerLogic
 * ]
 */
const replaceTagsMiddleware = (allowedFields) => {
  return (req, res, next) => {
    const brand = req.query?.brand ?? req.body?.brand
    const isRetainingTags = JSON.parse(req.query?.retain_dynamic_tags ?? req.query?.retainDynamicTags ?? 'false')

    const sendJson = res.json

    res.json = function(body, ...params) {
      try {
        if (res.statusCode < 400) {
          body = replaceTags(body, brand, allowedFields, isRetainingTags)
        }
      } catch {}

      sendJson.call(this, body, ...params)
      return res
    }

    next()
  }
}

module.exports = {
  replaceTagsMiddleware,
  replaceTags,
  brandContent: dynamicValuesSource,
}
