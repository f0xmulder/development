// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

export const modelFromCodeResponse = (code) => ({
  id: code.id,
  ownerName: code.owner_name,
  name: code.name,
  url: code.url,
  lastChange: new Date(code.last_change),
  stars: code.stars,
  source: code.source,
  relatedApis: code.related_apis,
  programmingLanguages: code.programming_languages || [],
})
