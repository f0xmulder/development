// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import objectKeysToCamelCase from '../../../utils/objectKeysToCamelCase'

export default async function (vendor, apiId) {
  if (vendor !== 'discourse') {
    console.error('Forum vendor is not discourse.')
    return null
  }

  try {
    const response = await fetch(`/api/apis/${apiId}/forum-posts`)
    const json = await response.json()
    return {
      error: null,
      json: objectKeysToCamelCase(json.topic_list.topics.slice(0, 5)),
    }
  } catch (error) {
    return {
      error,
    }
  }
}
