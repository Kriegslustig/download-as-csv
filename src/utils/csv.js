export const escapeField = (separator) => (field) => {
  if (
    field.indexOf(separator) > -1 ||
    field.indexOf('"') > -1
  ) {
    return `"${field.replace(/"/g, '""')}"`
  } else {
    return field
  }
}

export const objectToVector = (renderHeader = true) => (dataArr) => {
  const vec = []
  let keys

  if (Array.isArray(renderHeader)) {
    vec.push(renderHeader)
    keys = renderHeader
  } else if (dataArr.length > 0) {
    keys = Object.keys(dataArr[0])

    if (renderHeader) {
      vec.push(keys)
    }
  }

  dataArr.forEach((value) => {
    vec.push(
      keys.map((key) => value[key])
    )
  })

  return vec
}

export const vectorToCsv = ({ separator = ',', lineBreak = '\n' } = {}) =>
  (vec) =>
    vec.map((line) =>
      line.map(escapeField(separator))
        .join(separator)
    )
      .join(lineBreak)
