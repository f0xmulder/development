// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

/* eslint-disable no-template-curly-in-string */

export const mixed = {
  default: '${path} is ongeldig',
  required: '${path} is verplicht',
  oneOf: '${path} moet een van deze waarden zijn: ${values}',
  notOneOf: '${path} mag niet een van de deze waarden zijn: ${values}',
}

export const string = {
  length: '${path} moet uit exact ${length} tekens bestaan',
  min: '${path} moet tenminste uit {min} tekens bestaan',
  max: '${path} mag uit maximaal ${max} karakters bestaan',
  matches: '${path} moet overeenkomen met: "${regex}"',
  email: '${path} moet een geldig e-mailadres zijn',
  url: '${path} moet een geldige URL zijn',
  trim: '${path} moet een getrimde tekst zijn',
  lowercase: '${path} moet uit kleine letters bestaan',
  uppercase: '${path} moet uit hoofdletters bestaan',
}

export const number = {
  min: '${path} moet groter dan of gelijk aan ${min} zijn',
  max: '${path} moet kleiner dan of gelijk aan ${max} zijn',
  lessThan: '${path} moet kleiner zijn dan ${less}',
  moreThan: '${path} moet groter zijn dan ${more}',
  notEqual: '${path} moet gelijk zijn aan ${notEqual}',
  positive: '${path} moet een natuurlijk getal zijn',
  negative: '${path} moet een negatief getal zijn',
  integer: '${path} moet een geheel getal zijn',
}

export const date = {
  min: '${path} veld moet later zijn dan ${min}',
  max: '${path} veld moet eerder zijn dan ${max}',
}

export const boolean = {}

export const object = {
  noUnknown:
    '${path} veld mag geen eigenschappen bevatten die niet eerder zijn gedefiniëerd',
}

export const array = {
  min: '${path} veld moet uit ten minste ${min} items bestaan',
  max: '${path} veld moet uit maximaal ${max} items bestaan',
}
