// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

export const prettyDayOfWeek = {
  0: 'zondag',
  1: 'maandag',
  2: 'dinsdag',
  3: 'woensdag',
  4: 'donderdag',
  5: 'vrijdag',
  6: 'zaterdag',
}

export const prettyMonth = {
  0: 'januari',
  1: 'februari',
  2: 'maart',
  3: 'april',
  4: 'mei',
  5: 'juni',
  6: 'juli',
  7: 'augustus',
  8: 'september',
  9: 'oktober',
  10: 'november',
  11: 'december',
}

export const prettyTimePart = (input) => {
  if (input < 10) {
    return `0${input}`
  }

  return `${input}`
}
