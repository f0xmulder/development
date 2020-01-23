import objectKeysToCamelCase from '../../../utils/objectKeysToCamelCase'

export default async function(vendor, url) {
  if (vendor !== 'discourse') {
    console.error('Forum vendor is not discourse.')
    return null
  }

  try {
    const response = await fetch(`${url}.json`)
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
