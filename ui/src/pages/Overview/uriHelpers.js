export function generateQueryParams(params) {
  const urlParams = new URLSearchParams()

  Object.keys(params).forEach((key) => {
    if (params[key].length === 0) return

    if (params[key] instanceof Array) {
      const values = params[key]
      values.forEach((value) => urlParams.append(key, value))
    } else {
      urlParams.append(key, params[key])
    }
  })

  return urlParams
}
