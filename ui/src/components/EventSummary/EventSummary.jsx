// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, instanceOf } from 'prop-types'

import {
  prettyDayOfWeek,
  prettyMonth,
  prettyTimePart,
} from '../../utils/prettyDateTimes'
import IconTime from '../Icons/Time'
import IconPin from '../Icons/Pin'
import ExternalIcon from '../Icons/External'
import { StyledCard, StyledLink } from './EventSummary.styles'

const EventSummary = ({ title, startDate, location, registrationUrl }) => (
  <StyledCard>
    <StyledCard.DateTime>
      <StyledCard.DateTime.DayOfWeek>
        {prettyDayOfWeek[startDate.getDay()]}
        {` `}
      </StyledCard.DateTime.DayOfWeek>
      <StyledCard.DateTime.Day>
        {startDate.getDate()}
        {` `}
      </StyledCard.DateTime.Day>
      <StyledCard.DateTime.Month>
        {prettyMonth[startDate.getMonth()]}
        {` `}
      </StyledCard.DateTime.Month>
    </StyledCard.DateTime>
    <StyledCard.Body>
      <StyledCard.Title>{title}</StyledCard.Title>
      <StyledCard.Details>
        <StyledCard.Details.Item>
          <IconTime />
          {prettyTimePart(startDate.getHours())}:
          {prettyTimePart(startDate.getMinutes())}
        </StyledCard.Details.Item>
        <StyledCard.Details.Item>
          <IconPin />
          {location}
        </StyledCard.Details.Item>
      </StyledCard.Details>
    </StyledCard.Body>
    {registrationUrl ? (
      <StyledCard.LinkContainer>
        <StyledLink
          target="_blank"
          rel="noopener noreferrer"
          href={registrationUrl}
        >
          Naar event pagina
        </StyledLink>
        <ExternalIcon />
      </StyledCard.LinkContainer>
    ) : null}
  </StyledCard>
)

EventSummary.propTypes = {
  title: string.isRequired,
  startDate: instanceOf(Date).isRequired,
  location: string.isRequired,
  registrationUrl: string.isRequired,
}

export default EventSummary
