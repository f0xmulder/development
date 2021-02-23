// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import userEvent from '@testing-library/user-event'
import { act, screen, SetupTest } from '../../test-helpers'
import EventOverview from './EventOverview'

const apiResponse = {
  page: 1,
  rowsPerPage: 10,
  totalResults: 2,
  results: [
    {
      id: 1,
      title: '1st event',
      start_date: '2021-02-22T13:30:00+01:00',
      location: 'Den Bosch',
      registration_url: 'https://www.meetup.com',
    },
    {
      id: 2,
      title: '2nd event',
      start_date: '2021-03-22T13:30:00+01:00',
      location: 'Eindhoven',
      registration_url: 'https://www.meetup.com',
    },
  ],
}

describe('EventOverview', () => {
  const { server, setup } = new SetupTest(
    <EventOverview />,
    '/api/events?page=1',
    apiResponse,
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should exist', () => {
    const wrapper = shallow(<EventOverview />)
    expect(wrapper.exists()).toEqual(true)
  })

  it('should handle backend errors gracefully', async () => {
    await setup({
      throwBackendError: true,
      assert: () => {
        expect(
          screen.getByText(
            /Er ging iets fout tijdens het ophalen van de events./,
          ),
        ).toBeInTheDocument()
      },
      waitForLoadingToFinish: false,
    })
  })

  it('should show a message when there are no events available', async () => {
    await setup({
      customResponse: {
        ...apiResponse,
        results: [],
      },
      assert: () => {
        expect(
          screen.getByText(/Er zijn \(nog\) geen events beschikbaar./),
        ).toBeInTheDocument()
      },
      waitForLoadingToFinish: false,
    })
  })

  it('should have an add event button', async () => {
    await setup({
      assert: () => {
        expect(
          screen.getAllByRole('link', {
            name: /event toevoegen/i,
          }),
        ).toHaveLength(2)
      },
    })
  })

  it('should redirect after click on add event button', async () => {
    await setup({
      assert: () => {
        expect(window.location.pathname).toBe('/')
        // Get the first button
        const button = screen.getAllByRole('link', {
          name: /event toevoegen/i,
        })[0]
        userEvent.click(button)
        expect(window.location.pathname.includes('events/add')).toBeTruthy()
      },
    })
  })

  it('should show the total number of events', async () => {
    await setup({
      assert: () => {
        expect(
          screen.getByText(
            (_, element) => element.getAttribute('data-test') === 'total',
          ),
        ).toHaveTextContent('2 Events')
      },
      waitForLoadingToFinish: false,
    })
  })

  it('should show a list of events', async () => {
    await setup({
      assert: () => {
        expect(
          screen.getAllByRole('link', {
            name: /^Ga naar de website:.*$/,
          }),
        ).toHaveLength(2)
      },
      waitForLoadingToFinish: false,
    })
  })

  describe('Pagination', () => {
    const scrollTo = window.scrollTo
    beforeEach(() => {
      window.scrollTo = jest.fn()
    })
    afterEach(() => {
      window.scrollTo = scrollTo
    })
    it('should show pagination', async () => {
      const response = {
        ...apiResponse,
        page: 1,
        rowsPerPage: 1,
        totalResults: 2,
      }
      await setup({
        customResponse: response,
        assert: () => {
          expect(screen.getByRole('button', { name: /1/ })).toBeInTheDocument()
          expect(screen.getByRole('button', { name: /2/ })).toBeInTheDocument()
        },
        waitForLoadingToFinish: false,
      })
    })

    it('should handle pagination', async () => {
      const response = {
        ...apiResponse,
        page: 1,
        rowsPerPage: 1,
        totalResults: 2,
      }
      await setup({
        customResponse: response,
        assert: ({ historyMock }) => {
          const pageTwo = screen.getByRole('button', { name: /2/ })
          act(() => {
            userEvent.click(pageTwo)
          })
          expect(historyMock.push).toHaveBeenCalledWith('?pagina=2')
        },
        waitForLoadingToFinish: false,
      })
    })
  })
})
