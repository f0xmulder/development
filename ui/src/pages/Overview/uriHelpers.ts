export type UrlParamsMap = {
  [key: string]: string | string[]
}

export function generateQueryParams(params: UrlParamsMap): URLSearchParams {
  const urlParams = new URLSearchParams()

  Object.keys(params).forEach((key) => {
    if (params[key].length === 0) return

    if (params[key] instanceof Array) {
      const values = params[key] as string[]
      values.forEach((value) => urlParams.append(key, value))
    } else {
      urlParams.append(key, params[key] as string)
    }
  })

  return urlParams
}
