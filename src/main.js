import toUtf8 from 'string-to-utf8'
import base64 from './utils/base64'

import { vectorToCsv, objectToVector } from './utils/csv'

const createDataUri = (data, options = {}) => {
  const csvString = vectorToCsv(options)(
    objectToVector(options.header)(data)
  )

  const utf8String = toUtf8(csvString).reduce(
    (acc, keyCode) => acc + String.fromCharCode(keyCode),
    ''
  )

  const base64Data = base64.encode(utf8String)

  return `data:text/csv;charset=UTF-8;base64,${base64Data}`
}

export default createDataUri
