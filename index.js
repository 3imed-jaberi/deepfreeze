/*!
 * @3imed-jaberi/deepfreeze
 * Copyright(c) 2021 Imed Jaberi
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const cloneDeep = require('lodash.clonedeep')

/**
 * Expose `deepFreeze()`.
 */

module.exports = deepFreeze

/**
 * @api public
 * @function deepFreeze
 * @description - Function to deep freeze objects.
 * @param {Object} object - Object to deep freeze.
 * @param {Object} [options]
 * @param {Number} [options.isProd=true]
 * @param {String} [options.pureFreeze=true]
 * @returns {Object} - Deep frozen object.
 */
function deepFreeze (
  object,
  { isProd, pureFreeze } = { isProd: false, pureFreeze: false }
) {
  // handle the freeze way.
  function _deepFreeze (_object) {
    // freeze arrays, objects and functions and primitives.

    // Note: Object.isFrozen will also return `true` for primitives
    // (numbers, strings, booleans, undefined, null), so there is no
    // need to check for those explicitly.
    if (Object.isFrozen(_object)) {
      return _object
    }

    // freeze the Map object.
    if (_object instanceof Map) {
      // override the clear, delete and set method.
      _object.set = _object.clear = _object.delete = function () {
        throw new Error('Map is read-only')
      }
      //
      return _object
    }

    // freeze the Set object.
    if (_object instanceof Set) {
      // override the add, delete and set method.
      _object.add = _object.clear = _object.delete = function () {
        throw new Error('Set is read-only')
      }
      //
      return _object
    }

    // At this point we know that we're dealing with either an array or plain object, so
    // just freeze it and recurse on its values.

    // freeze the objet.
    Object.freeze(_object)

    // recurse the deep freeze handler.
    Object.getOwnPropertyNames(_object).forEach(function (key) {
      if (
        // exist the key inside the object.
        _object.hasOwnProperty(key) &&
        // isn't null.
        _object[key] !== null &&
        // is an object or a function.
        (typeof _object[key] === 'object' || typeof _object[key] === 'function') &&
        // is not frozen previously.
        !Object.isFrozen(_object[key])
      ) {
        _deepFreeze(_object[key])
      }
    })

    return _object
  }

  // no freezing in production (for better performance).
  if (isProd) return object

  // add isDeepFrozen method property to the object
  // only if the passed object isn't frozen.
  if (!Object.isFrozen(object)) {
    Object.defineProperty(object, 'isDeepFrozen', { value: () => true })
  }

  // hande the pure freeze by use the deep clone lodash method.
  object = pureFreeze ? cloneDeep(object) : object

  // return the deep frozen object.
  return _deepFreeze(object)
}
