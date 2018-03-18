import createDataUri from '../main.js'

const setup = (inputData, options) => {
  const result = createDataUri(inputData || [{ a: '1', b: 'c' }], options)
  const [prefix, base64] = result.split(',')
  const data = Buffer.from(base64, 'base64').toString('utf8')
  return { result, prefix, data, base64 }
}

describe('createDataUri', () => {
  it('should return a data URI', () => {
  })


  it('should set the mime type to UTF-8 encoded CSV', () => {
    const { prefix } = setup()
    expect(prefix).toBe('data:text/csv;charset=UTF-8;base64')
  })

  it('should write a header line', () => {
    const { data } = setup()
    expect(data).toContain('a,b\n')
  })

  it('should not write a header line if it is turned off', () => {
    const { data } = setup(null, { header: false })
    expect(data).not.toContain('a,b\n')
  })

  it('should use the chosen seperator', () => {
    const { data } = setup(null, { seperator: ';' })
    expect(data).toContain('1;2')
  })

  it('should use the chosen line breaks', () => {
    const { data } = setup(null, { lineBreak: '\r\n' })
    expect(data).toContain('a,b\r\n')
  })

  it('should wrap fields in double quotes if they contain a seperator', () => {
    const { data } = setup([{ a: ',' }])
    expect(data).toContain('","')
  })

  it('should escape doublequotes', () => {
    const { data } = setup([{ a: '"' }])
    expect(data).toContain('""""')
  })

  it('be able to handle UTF-8 characters', () => {
    const input = { origin: '🇨🇭', something: '🎀' }
    const { data } = setup(input)
  })
})
