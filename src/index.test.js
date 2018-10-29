import { reloadPersistedState, persister } from './index.js'

describe('reloadPersistedState', function () {
  it('called without any param should return and empty object', function () {
    window.localStorage.clear()
    const result = reloadPersistedState()
    expect(Object.keys(result).length).toEqual(0)
  })

  it('if no data is set on localstorage, it should return the default initial state', function () {
    window.localStorage.clear()
    const defaultState = {
      a: 0,
      b: 1,
      c: 2,
    }

    const id = Math.round(Math.random() * 1000) + ''
    const result = reloadPersistedState(id, defaultState)
    if (Object.keys(result).some(
      key => defaultState.hasOwnProperty(key) === false
    )) {
      throw new Error('Whaaaat')
    }
  })

  it('called without initial state, state should be equal to localstorage saved state', function () {
    window.localStorage.clear()
    const id = Math.round(Math.random() * 1000) + ''
    const data = JSON.stringify({ b: 2, c: 3 })
    window.localStorage.setItem(id, data)
    const result = reloadPersistedState(id)
    expect(JSON.stringify(result)).toEqual(data)
  })

  it('if there is data set on localstorage, it should return the merged localstorage data with the default initial state', function () {
    window.localStorage.clear()
    const defaultState = {
      a: 0,
      b: 1,
      c: 2,
    }

    const id = Math.round(Math.random() * 1000) + ''
    window.localStorage.setItem(id, JSON.stringify({ b: 2, c: 3 }))
    const result = reloadPersistedState(id, defaultState)
    if (Object.keys(result).some(
      key => defaultState.hasOwnProperty(key) === false
    )) {
      throw new Error('Does not contain the same keys')
    }

    expect(result.b).toEqual(2)
  })
})

describe('persister', function () {
  it('should return an object with a property after with the function type', function () {
    window.localStorage.clear()
    const result = persister()
    expect(typeof result.after).toEqual('function')
  })

  it('after function should return undefined', function () {
    window.localStorage.clear()
    const result = persister()
    expect(result.after()).toEqual(undefined)
    expect(result.after({ a: 1, b: 1 })).toEqual(undefined)
  })

  it('after function should save the passed state on localstorage', function () {
    window.localStorage.clear()
    const result = persister('local')
    const data = { a: 1, b: 1 }
    result.after(data)
    expect(JSON.stringify(data)).toEqual(window.localStorage.getItem('local'))
  })

  it('after function should save an empty object if no state is passed', function () {
    window.localStorage.clear()
    const result = persister('local')
    result.after()
    expect('{}').toEqual(window.localStorage.getItem('local'))
  })
})
