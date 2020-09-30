// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import TimeAgo from 'javascript-time-ago'
import nl from 'javascript-time-ago/locale/nl'

class TimeAgoFormatter {
  static instance = null

  // Lazy-load the TimeAgo instance
  static getInstance() {
    if (this.instance === null) {
      TimeAgo.addLocale(nl)
      this.instance = new TimeAgo('nl-NL')
    }

    return this.instance
  }
}

// Format date as (approximately) X time ago.
// E.g. 1 minuut geleden, 2 weken geleden, etc.
export const formatAsTimeAgo = (date) =>
  TimeAgoFormatter.getInstance().format(date)
