import { escapeField, vectorToCsv, objectToVector } from '../csv.js'

describe('escapeField', () => {
  it('should do nothing if a field does not contain a separator', () => {
    const result = escapeField(',')('a')
    expect(result).toBe('a')
  })

  it('should wrap the field in double quotes if it contains a separator', () => {
    const result = escapeField(',')(',')
    expect(result).toBe('","')
  })

  it('should escape quotes in fields', () => {
    const result = escapeField(',')('"')
    expect(result).toBe('""""')
  })
})

describe('objectToVector', () => {
  it('should create a header based on the first object', () => {
    const result = objectToVector()([{ a: 1, b: 2 }])
    expect(result[0]).toEqual(['a', 'b'])
  })

  it('should not return a header if it is turned off', () => {
    const result = objectToVector(false)([{ a: 1, b: 2 }])
    expect(result).toHaveLength(1)
  })

  it('should return an array containing the object as an array of values', () => {
    const result = objectToVector(false)([{ a: 'b', c: 'd' }])
    expect(result[0]).toEqual(['b', 'd'])
  })

  it('should use the passed header', () => {
    const result = objectToVector(['a', 'b'])([{ b: 1, a: 2, c: 3 }])
    expect(result).toEqual([
      ['a', 'b'],
      [2, 1],
    ])
  })
})

describe('vectorToCsv', () => {
  it('should convert an array of arrays into a CSV string', () => {
    const result = vectorToCsv()([
      ['a', 'b'],
      ['c', 'd'],
    ])
    expect(result).toBe('a,b\nc,d')
  })

  it('should escape fields', () => {
    const result = vectorToCsv()([[ ',' ]])
    expect(result).toBe('","')
  })

  it('should use the given separator', () => {
    const result = vectorToCsv({ separator: ';' })([['a', 'b']])
    expect(result).toBe('a;b')
  })

  it('should use the given line-breaks', () => {
    const result = vectorToCsv({ lineBreak: '\r\n' })([
      ['a', 'b'],
      ['c', 'd'],
    ])
    expect(result).toBe('a,b\r\nc,d')
  })
})
