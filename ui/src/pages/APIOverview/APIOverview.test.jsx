// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import userEvent from '@testing-library/user-event'
import { act, screen, SetupTest } from '../../test-helpers'
import { backendApiMock } from '../../models/api.mock'
import APIOverview from './APIOverview'
import { StyledOverviewPage } from './APIOverview.styles'

const apiResponse = {
  page: 1,
  rowsPerPage: 2,
  totalResults: 2,
  results: [
    backendApiMock,
    {
      ...backendApiMock,
      id: 'id2',
      service_name: 'service_name2',
      organization_oin: '00000001001589623000',
      api_type: 'rest_xml',
    },
  ],
  facets: {
    organization_oin: {
      terms: [
        {
          term: 'organization name',
          display_name: 'organization name',
          count: 1,
        },
        {
          term: 'organization_name2',
          display_name: 'organization_name2',
          count: 1,
        },
      ],
    },
    api_type: {
      terms: [
        {
          term: 'rest_json',
          count: 1,
        },
        {
          term: 'rest_xml',
          count: 1,
        },
      ],
    },
  },
}

describe('APIOverview', () => {
  const { server, setup } = new SetupTest(
    <APIOverview />,
    '/api/apis',
    apiResponse,
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should exist', () => {
    const wrapper = shallow(<APIOverview />)
    expect(wrapper.find(StyledOverviewPage).exists()).toBe(true)
  })

  it('should handle backend errors gracefully', async () => {
    await setup({
      throwBackendError: true,
      assert: () => {
        expect(
          screen.getByText(
            /Er ging iets fout tijdens het ophalen van de API's./,
          ),
        ).toBeInTheDocument()
      },
      ignoreLoadingState: false,
    })
  })

  it('should show a message when there are no APIs available', async () => {
    const customResponse = Object.assign({}, apiResponse)
    customResponse.results = []
    customResponse.facets = {}
    await setup({
      customResponse,
      assert: () => {
        expect(
          screen.getByText(/Er zijn \(nog\) geen API's beschikbaar./),
        ).toBeInTheDocument()
      },
      ignoreLoadingState: false,
    })
  })

  it('should have a search input field', async () => {
    await setup({
      assert: () => {
        expect(
          screen.getByRole('textbox', {
            name: /zoekterm/i,
          }),
        ).toBeInTheDocument()
      },
    })
  })

  it('should have an add API button', async () => {
    await setup({
      assert: () => {
        expect(
          screen.getAllByRole('link', {
            name: /api toevoegen/i,
          }),
        ).toHaveLength(2)
      },
    })
  })

  it('should redirect to add API form when pressin on add API button', async () => {
    await setup({
      assert: (render) => {
        expect(window.location.pathname).toEqual('/')

        const button = render.getAllByRole('link', {
          name: /api toevoegen/i,
        })[0]
        userEvent.click(button)
        expect(window.location.pathname).toEqual(
          expect.stringContaining('apis/add'),
        )
      },
    })
  })

  describe('API List', () => {
    it('should show a filter for the API type', async () => {
      await setup({
        assert: () => {
          expect(
            screen.getByRole('checkbox', { name: /REST\/JSON/ }),
          ).toBeInTheDocument()
          expect(
            screen.getByRole('checkbox', { name: /REST\/XML/ }),
          ).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })
    it('should show a filter for the organization', async () => {
      await setup({
        assert: () => {
          expect(
            screen.getByRole('checkbox', { name: /organization name/i }),
          ).toBeInTheDocument()
          expect(
            screen.getByRole('checkbox', { name: /organization_name2/i }),
          ).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })
    it('should show the total number of APIs', async () => {
      await setup({
        assert: () => {
          expect(screen.getByText(/2 API's/)).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })
    it('should show a list of APIs', async () => {
      await setup({
        assert: () => {
          expect(
            screen.getByRole('link', { name: /service name/i }),
          ).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })

    describe.skip('Pagination', () => {
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
            expect(
              screen.getByRole('button', { name: /1/ }),
            ).toBeInTheDocument()
            expect(
              screen.getByRole('button', { name: /2/ }),
            ).toBeInTheDocument()
          },
          ignoreLoadingState: false,
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
          ignoreLoadingState: false,
        })
      })
      it('should handle results per page', async () => {
        const response = {
          ...apiResponse,
          page: 1,
          rowsPerPage: 20,
          totalResults: 20,
        }
        await setup({
          customResponse: response,
          assert: ({ historyMock }) => {
            const resultsPerPage = screen.getByLabelText(
              'Aantal resultaten per pagina',
            )
            act(() => {
              userEvent.selectOptions(resultsPerPage, ['10'])
            })
            expect(historyMock.push).toHaveBeenCalledWith(
              '?aantalPerPagina=10&pagina=1',
            )
          },
          ignoreLoadingState: false,
        })
      })
    })

    describe('Filter', () => {
      // Surpress act errors
      const error = console.error

      beforeAll(() => {
        console.error = jest.fn
      })
      afterAll(() => {
        console.error = error
      })

      it('should filter by text', async () => {
        await setup({
          assert: ({ historyMock }) => {
            const input = screen.getByRole('textbox', {
              name: /zoekterm/i,
            })
            act(() => {
              userEvent.type(input, 'organization_name2')
            })
            expect(historyMock.push).toHaveBeenCalled()
          },
        })
      })

      it('should filter by API type', async () => {
        await setup({
          assert: ({ historyMock }) => {
            const checkbox = screen.getByRole('checkbox', { name: /REST\/XML/ })
            act(() => {
              userEvent.click(checkbox)
            })
            expect(checkbox).toBeChecked()
            expect(historyMock.push).toHaveBeenCalledWith('?type=rest_xml')
          },
          ignoreLoadingState: false,
        })
      })
      it('should filter by organization', async () => {
        await setup({
          assert: ({ historyMock }) => {
            const checkbox = screen.getByRole('checkbox', {
              name: /organization_name2/i,
            })
            act(() => {
              userEvent.click(checkbox)
            })
            expect(checkbox).toBeChecked()
            expect(historyMock.push).toHaveBeenCalledWith(
              '?organisatie=organization_name2',
            )
          },
          ignoreLoadingState: false,
        })
      })
    })
  })
})
