// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import { screen } from '@testing-library/react'
import { cache, SWRConfig } from 'swr'
import { SetupTest } from '../../test-helpers'
import Home from './Home'
import { StyledHeading } from './Home.styles'

const events = {
  page: 1,
  rowsPerPage: 3,
  totalResults: 3,
  results: [
    {
      id: 1,
      title: '1st event',
      start_date: '2021-02-22T13:30:00+01:00',
      location: 'Den Bosch',
      registration_url: 'https://www.meetup1.com',
    },
    {
      id: 2,
      title: '2nd event',
      start_date: '2022-03-22T13:30:00+01:00',
      location: 'Eindhoven',
      registration_url: 'https://www.meetup2.com',
    },
    {
      id: 3,
      title: '3rd event',
      start_date: '2023-03-22T13:30:00+01:00',
      location: 'Amsterdam',
      registration_url: 'https://www.meetup3.com',
    },
  ],
}

describe('Home', () => {
  describe('on initialization', () => {
    it('contains the page title', () => {
      const wrapper = shallow(<Home />)
      expect(wrapper.find(StyledHeading).exists()).toBe(true)
    })
  })

  describe('when rendered', () => {
    const { server, setup } = new SetupTest(
      (
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <Home />
        </SWRConfig>
      ),
      '/api/events?page=1',
      events,
    )

    beforeAll(() => server.listen())
    afterEach(() => {
      server.resetHandlers()
      cache.clear()
    })
    afterAll(() => server.close())

    it('should contain a link to the API overview', async () => {
      await setup({
        assert: () => {
          expect(screen.getByText(/Bekijk API's/)).toBeInTheDocument()
        },
        waitForLoadingToFinish: false,
      })
    })
    it('should contain a link to developer forum', async () => {
      await setup({
        assert: () => {
          expect(screen.getByText(/Ga naar forum/)).toBeInTheDocument()
        },
        waitForLoadingToFinish: false,
      })
    })
    it('should show upcoming events', async () => {
      await setup({
        assert: () => {
          const links = screen.getAllByRole('link', {
            name: /^Ga naar de website:.*$/,
          })
          expect(links).toHaveLength(3)
          links.forEach((link, i) =>
            expect(link).toHaveAttribute(
              'href',
              events.results[i].registration_url,
            ),
          )
        },
        waitForLoadingToFinish: false,
      })
    })
  })
})
