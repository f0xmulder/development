// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { arrayOf, shape, string, number, instanceOf } from 'prop-types'
import EventSummary from '../EventSummary/EventSummary'

import { StyledList, StyledListItem } from './EventList.styles'

const EventList = ({ events }) => (
  <StyledList>
    {events.map((event) => (
      <StyledListItem key={event.id}>
        <EventSummary {...event} />
      </StyledListItem>
    ))}
  </StyledList>
)

EventList.propTypes = {
  events: arrayOf(
    shape({
      id: number.isRequired,
      title: string.isRequired,
      startDate: instanceOf(Date).isRequired,
      location: string.isRequired,
      registrationUrl: string.isRequired,
    }),
  ),
}

export default EventList
