// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/dom'
import { screen, act, SetupTest } from '../../test-helpers'
import CodeOverview from './CodeOverview'

const apiResponse = {
  page: 1,
  rowsPerPage: 2,
  totalResults: 2,
  results: [
    {
      id: 1,
      owner_name: 'owner_name/1',
      name: 'project.one.nl',
      url: 'https://gitlab.com/commonground/don/project.one.nl',
      last_change: '2021-02-17T00:00:00.000000+01:00',
      stars: 10,
      source: 'GitLab repository',
      programming_languages: ['JavaScript'],
      related_apis: [
        {
          service_name: 'Test API',
          organization_name: 'Test Organization',
          api_id: 'test-api_id',
        },
      ],
    },
    {
      id: 2,
      owner_name: 'owner_name/2',
      name: 'project.two.nl',
      url: 'https://gitlab.com/commonground/don/project.two.nl',
      last_change: '2021-02-17T00:00:00.000000+01:00',
      stars: 20,
      source: 'GitHub repository',
      programming_languages: ['Python'],
      related_apis: [
        {
          service_name: 'Another Test API',
          organization_name: 'Another Test Organization',
          api_id: 'another-test-api_id',
        },
      ],
    },
  ],
  programmingLanguages: [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Python',
    },
  ],
}

describe('CodeOverview', () => {
  const { server, setup } = new SetupTest(
    <CodeOverview />,
    '/api/code',
    apiResponse,
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should exist', () => {
    const wrapper = shallow(<CodeOverview />)
    expect(wrapper.exists()).toEqual(true)
  })

  it('should handle backend errors gracefully', async () => {
    await setup({
      throwBackendError: true,
      assert: () => {
        expect(
          screen.getByText(
            /Er ging iets fout tijdens het ophalen van de code./,
          ),
        ).toBeInTheDocument()
      },
      ignoreLoadingState: false,
    })
  })

  it('should show a message when there are no projects available', async () => {
    await setup({
      customResponse: {
        ...apiResponse,
        results: [],
        programmingLanguages: [],
      },
      assert: () => {
        expect(
          screen.getByText(/Er is \(nog\) geen code beschikbaar./),
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

  it('should have a filter by programming language field', async () => {
    await setup({
      assert: () => {
        expect(screen.getByText(/Programmeertalen/i)).toBeInTheDocument()
      },
      ignoreLoadingState: false,
    })
  })

  it('should have an add project button', async () => {
    await setup({
      assert: () => {
        expect(
          screen.getAllByRole('link', {
            name: /project toevoegen/i,
          }),
        ).toHaveLength(2)
      },
    })
  })

  it('should redirect after click on add project button', async () => {
    await setup({
      assert: () => {
        expect(window.location.pathname).toBe('/')
        // Get the first button
        const button = screen.getAllByRole('link', {
          name: /project toevoegen/i,
        })[0]
        userEvent.click(button)
        expect(window.location.pathname.includes('code/add')).toBeTruthy()
      },
    })
  })

  it('should show the total number of projects', async () => {
    await setup({
      assert: () => {
        expect(screen.getByText(/2 projecten/i)).toBeInTheDocument()
      },
      ignoreLoadingState: false,
    })
  })

  it('should show a list of projects', async () => {
    await setup({
      assert: () => {
        apiResponse.results.forEach((project) => {
          expect(
            screen.getByRole('link', {
              name: `${project.owner_name}/${project.name}`,
            }),
          )
        })
      },
      ignoreLoadingState: false,
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
    it('should filter by text', async () => {
      await setup({
        assert: ({ historyMock }) => {
          const input = screen.getByRole('textbox', {
            name: /zoekterm/i,
          })
          act(() => {
            fireEvent.change(input, { target: { value: 'owner_name/1' } })
          })

          expect(historyMock.push).toHaveBeenCalledWith(
            expect.stringContaining('code?q=owner_name'),
          )
        },
      })
    })
    it('should filter by programming language', async () => {
      await setup({
        assert: async ({ historyMock }) => {
          const input = screen.getByRole('textbox', {
            name: (_, element) => element.id.includes('react-select'),
          })
          expect(input).toBeInTheDocument()

          act(() => {
            fireEvent.click(input)
            userEvent.type(input, 'javascript{enter}')
          })

          expect(historyMock.push).toHaveBeenCalledWith(
            '/code?programming_languages=1',
          )
        },
        ignoreLoadingState: false,
      })
    })
  })
})
