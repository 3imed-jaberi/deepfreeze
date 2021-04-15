'use strict'

const { expect } = require('chai')

const deepFreeze = require('.')

describe('deepFreeze', function () {
  it('deep freezes a simple object structure and returns it', function () {
    const object = {
      someBoolean: true,
      someNumber: 10,
      someString: 'hello!',
      someObject: { foo: 'bar', someNestedObject: { nested: 'inObject' } },
      someArray: [false, 20, 'bye!', { nested: 'inArray' }]
    }

    expect(deepFreeze(object)).to.equal(object)
    expect(object.isDeepFrozen()).to.equal(true)
    expect(Object.isFrozen(object)).to.equal(true)
    expect(Object.isFrozen(object.someObject)).to.equal(true)
    expect(Object.isFrozen(object.someObject.someNestedObject)).to.equal(true)
    expect(Object.isFrozen(object.someArray)).to.equal(true)
    object.someArray.forEach((value) => {
      expect(Object.isFrozen(value)).to.equal(true)
    })
  })

  it('ignore the freeze process when pass isProd option as true', function () {
    const object = {
      someBoolean: true,
      someNumber: 10,
      someString: 'hello!',
      someObject: { foo: 'bar', someNestedObject: { nested: 'inObject' } },
      someArray: [false, 20, 'bye!', { nested: 'inArray' }]
    }

    expect(deepFreeze(object, { isProd: true })).to.equal(object)
    // we don't have the isDeepFrozen() method here.
    expect(Object.isFrozen(object)).to.equal(false)
    expect(Object.isFrozen(object.someObject)).to.equal(false)
    expect(Object.isFrozen(object.someObject.someNestedObject)).to.equal(false)
    expect(Object.isFrozen(object.someArray)).to.equal(false)
    object.someArray.forEach((value) => {
      expect(Object.isFrozen(value)).to.equal(typeof value !== 'object')
    })
  })

  it('clone the passed object when pass pureFreezen option as true', function () {
    const object = {
      someBoolean: true,
      someNumber: 10,
      someString: 'hello!',
      someObject: { foo: 'bar', someNestedObject: { nested: 'inObject' } },
      someArray: [false, 20, 'bye!', { nested: 'inArray' }]
    }

    const clonedObject = deepFreeze(object, { pureFreeze: true })

    expect(clonedObject).to.not.equal(object)
    expect(object.isDeepFrozen()).to.equal(true)
    expect(Object.isFrozen(clonedObject)).to.equal(true)
    expect(Object.isFrozen(clonedObject.someObject)).to.equal(true)
    expect(Object.isFrozen(clonedObject.someObject.someNestedObject)).to.equal(true)
    expect(Object.isFrozen(clonedObject.someArray)).to.equal(true)
    clonedObject.someArray.forEach((value) => {
      expect(Object.isFrozen(value)).to.equal(true)
    })
  })

  it('don\'t give access to mutate objects deep down', function () {
    const object = {
      someObject: { foo: 'bar' }
    }

    expect(deepFreeze(object)).to.equal(object)
    expect(object.isDeepFrozen()).to.equal(true)
    expect(() => { object.someObject.foo = 'baz' }).to.throw()
  })

  it('don\'t recurse down when an object is already frozen', function () {
    const object = {
      someObject: { nested: 'inObject' }
    }
    Object.freeze(object)

    deepFreeze(object)

    // we don't have the isDeepFrozen() method here.
    expect(Object.isFrozen(object.someObject)).to.equal(false)
  })

  it('deep freezes a set object structure and returns it', function () {
    const setObject = new Set()
    setObject.add('A')
    setObject.add('B')
    setObject.add('C')
    setObject.add('D')

    expect(deepFreeze(setObject)).to.equal(setObject)
    expect(setObject.isDeepFrozen()).to.equal(true)
    expect(() => { setObject.add('E') }).to.throw()
    expect(() => { setObject.delete('E') }).to.throw()
    expect(() => { setObject.clear() }).to.throw()
  })

  it('deep freezes a map object structure and returns it', function () {
    const setObject = new Map()
    setObject.set('A')
    setObject.set('B')
    setObject.set('C')
    setObject.set('D')

    expect(deepFreeze(setObject)).to.equal(setObject)
    expect(setObject.isDeepFrozen()).to.equal(true)
    expect(() => { setObject.set('E') }).to.throw()
    expect(() => { setObject.delete('E') }).to.throw()
    expect(() => { setObject.clear() }).to.throw()
  })

  it('deep freezes a simple object with function and returns it', function () {
    const object = {
      methodX: function () { }
    }

    deepFreeze(object)

    expect(() => { object.propX = 5 }).to.throw()
    expect(object.propX).to.equal(undefined)
  })
})
