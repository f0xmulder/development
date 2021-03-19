// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { Button } from '@commonground/design-system'
import React from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import EventList from '../../components/EventList/EventList'
import { H2 } from '../../components/Headings/Headings'
import { modelFromAPIResponse } from '../../models/event'
import { StyledInternalIcon } from './Home.styles'
import { Events } from './UpcomingEvents.styles'

const UpcomingEvents = () => {
  const { data } = useSWR('/api/events?page=1&rowsPerPage=3', (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((json) =>
        Object.assign({}, json, {
          events: json.results.map((event) => modelFromAPIResponse(event)),
        }),
      ),
  )

  if (!data?.events?.length) {
    return null
  }
  return (
    <>
      <H2>Aankomende events</H2>
      <Events>
        <EventList events={data.events} />
        <Button variant="link" as={Link} to="/events">
          Bekijk alle events <StyledInternalIcon />
        </Button>
      </Events>
    </>
  )
}

export { UpcomingEvents as default }
