// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import { act, screen, fireEvent, SetupTest } from '../../test-helpers'
import { backendApiMock } from '../../models/api.mock'
import SubmitCodeForm from './SubmitCodeForm'

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

describe('SubmitCodeForm', () => {
  const { server, setup } = new SetupTest(
    <SubmitCodeForm />,
    '/api/apis',
    apiResponse,
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should exist', () => {
    const wrapper = shallow(<SubmitCodeForm />)
    expect(wrapper.exists()).toEqual(true)
  })

  describe('Form', () => {
    it('should have an alert about new project requirements', async () => {
      await setup({
        muteError: true,
        assert: () => {
          expect(screen.getByRole('alert')).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })

    it('should have a button to create an issue on GitLab', async () => {
      await setup({
        muteError: true,
        assert: () => {
          expect(
            screen.getByRole('link', { name: /Melding maken op GitLab/ }),
          ).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })

    it('should have a project URL input field', async () => {
      await setup({
        muteError: true,
        assert: () => {
          expect(
            screen.getByRole('textbox', { name: /Project URL/ }),
          ).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })

    it("should have a used API's select field", async () => {
      await setup({
        assert: () => {
          expect(
            screen.getByRole('textbox', {
              name: "Gebruikte API's",
            }),
          ).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })

    it('should have a submit button', async () => {
      await setup({
        assert: () => {
          expect(
            screen.getByRole('button', { name: /Project toevoegen/ }),
          ).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })

    describe('Errors', () => {
      it('shows an error when the API is down', async () => {
        await setup({
          throwBackendError: true,
          assert: () => {
            expect(
              screen.getByText(
                /Er ging iets fout tijdens het ophalen van de beschikbare API's/,
              ),
            ).toBeInTheDocument()
          },
          ignoreLoadingState: false,
        })
      })
    })

    describe('Validations', () => {
      it('show an error when the project url is missing', async () => {
        await setup({
          assert: () => {
            act(() => {
              fireEvent.change(
                screen.getByRole('textbox', { name: /Project URL/ }),
                {
                  target: { value: '' },
                },
              )
            })
            fireEvent.click(
              screen.getByRole('button', { name: /Project toevoegen/ }),
            )

            // Formik returns partially untranslated errors
            expect(
              screen.getByText(/URL naar code is a required field/),
            ).toBeInTheDocument()
          },
          ignoreLoadingState: false,
        })
      })

      it('show an error when the project url is invalid', async () => {
        await setup({
          assert: () => {
            act(() => {
              fireEvent.change(
                screen.getByRole('textbox', { name: /Project URL/ }),
                {
                  target: { value: '24/05/2020' },
                },
              )
            })
            fireEvent.click(
              screen.getByRole('button', { name: /Project toevoegen/ }),
            )

            // Formik returns partially untranslated errors
            expect(
              screen.getByText(/URL naar code must be a valid URL/),
            ).toBeInTheDocument()
          },
          ignoreLoadingState: false,
        })
      })

      it('show an error when the project url is not GitHub/GitLab', async () => {
        await setup({
          assert: () => {
            act(() => {
              fireEvent.change(
                screen.getByRole('textbox', { name: /Project URL/ }),
                {
                  target: { value: 'http://www.test.com' },
                },
              )
            })
            fireEvent.click(
              screen.getByRole('button', { name: /Project toevoegen/ }),
            )

            // Formik returns partially untranslated errors
            expect(
              screen.getByText(
                /URL naar code moet een GitLab of GitHub repository zijn/,
              ),
            ).toBeInTheDocument()
          },
          ignoreLoadingState: false,
        })
      })

      it('shows an error when used API is missing', async () => {
        await setup({
          assert: () => {
            fireEvent.click(
              screen.getByRole('button', { name: /Project toevoegen/ }),
            )

            // Formik returns partially untranslated errors
            expect(
              screen.getByText(/Selecteer ten minste één gebruikte API/),
            ).toBeInTheDocument()
          },
          ignoreLoadingState: false,
        })
      })
    })
  })
})
