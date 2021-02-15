// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import fetchMock from 'jest-fetch-mock'
import {
  renderWithProviders,
  act,
  screen,
  waitFor,
  fireEvent,
} from '../../test-helpers'
import CodeRepository from '../../domain/code-repository'
import { backendApiMock } from '../../models/api.mock'
import SubmitCodeForm from './SubmitCodeForm'

// Enable fetch mocks
fetchMock.enableMocks()

const renderForm = async (assertion) => {
  let result
  act(() => {
    result = renderWithProviders(<SubmitCodeForm />)
  })
  const projectUrlInput = screen.getByRole('textbox', { name: /Project URL/ })
  const usedApisInput = screen.getByText(/Selecteer één of meerdere API's/)
  const submitButton = screen.getByRole('button', { name: /Project toevoegen/ })

  await assertion({ result, projectUrlInput, usedApisInput, submitButton })

  // Completely complete rendering
  await act(() => Promise.resolve())
}

describe('SubmitCodeForm', () => {
  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(backendApiMock)
  })

  it('should exist', () => {
    const wrapper = shallow(<SubmitCodeForm />)
    expect(wrapper.exists()).toEqual(true)
  })

  describe('on intialize', () => {
    beforeEach(() => {
      fetch.resetMocks()
      fetch.mockResponseOnce(backendApiMock)
    })

    it('should fetch all the APIs', async () => {
      renderForm(() => {
        expect(fetch).toHaveBeenCalledWith(
          `/api/apis?rowsPerPage=${Number.MAX_SAFE_INTEGER}`,
        )
      })
    })
  })

  describe('Form', () => {
    beforeEach(() => {
      fetch.resetMocks()
      fetch.mockResponseOnce(backendApiMock)
    })

    it('should have an alert about new project requirements', async () => {
      renderForm(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })
    })

    it('should have a button to create an issue on GitLab', async () => {
      renderForm(() => {
        expect(
          screen.getByRole('link', { name: /Melding maken op GitLab/ }),
        ).toBeInTheDocument()
      })
    })

    it('should have a project URL input field', async () => {
      renderForm(({ projectUrlInput }) => {
        expect(projectUrlInput).toBeInTheDocument()
      })
    })

    it("should have a used API's select field", async () => {
      renderForm(({ usedApisInput }) => {
        expect(usedApisInput).toBeInTheDocument()
      })
    })

    it('should have a submit button', async () => {
      renderForm(({ submitButton }) => {
        expect(submitButton).toBeInTheDocument()
      })
    })

    describe('Errors', () => {
      beforeEach(async () => {
        fetch.resetMocks()
      })

      it('shows an error when the API is down', () => {
        fetch.mockReject(() => Promise.reject(new Error('API is down')))

        renderForm(() => {
          waitFor(() => {
            expect(
              screen.getByText(
                /Er ging iets fout tijdens het ophalen van de beschikbare API's/,
              ),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe('Validations', () => {
      beforeEach(async () => {
        fetch.resetMocks()
        fetch.mockResponse(backendApiMock)
      })

      it('show an error when the project url is missing', async () => {
        await renderForm(async ({ projectUrlInput, submitButton }) => {
          act(() => {
            fireEvent.change(projectUrlInput, {
              target: { value: '' },
            })
          })
          fireEvent.click(submitButton)

          await waitFor(() => {
            // Formik returns partially untranslated errors
            expect(
              screen.getByText(/URL naar code is a required field/),
            ).toBeInTheDocument()
          })
        })
      })

      it('show an error when the project url is invalid', async () => {
        await renderForm(async ({ projectUrlInput, submitButton }) => {
          act(() => {
            fireEvent.change(projectUrlInput, {
              target: { value: '24/05/2020' },
            })
          })
          fireEvent.click(submitButton)

          await waitFor(() => {
            // Jest returns untranslated errors
            expect(
              screen.getByText(/URL naar code must be a valid URL/),
            ).toBeInTheDocument()
          })
        })
      })

      it('show an error when the project url is not GitHub/GitLab', async () => {
        await renderForm(async ({ projectUrlInput, submitButton }) => {
          act(() => {
            fireEvent.change(projectUrlInput, {
              target: { value: 'http://www.test.com' },
            })
          })
          fireEvent.click(submitButton)

          await waitFor(() => {
            // Formik returns partially untranslated errors
            expect(
              screen.getByText(
                /URL naar code moet een GitLab of GitHub repository zijn/,
              ),
            ).toBeInTheDocument()
          })
        })
      })

      it('shows an error when used API is missing', async () => {
        await renderForm(async ({ submitButton }) => {
          fireEvent.click(submitButton)
          await waitFor(() => {
            expect(
              screen.getByText(/Selecteer ten minste één gebruikte API/),
            ).toBeInTheDocument()
          })
        })
      })

      // Logic needs to be extracted one level higher in order to test this
      it.skip('should submit with valid data', async () => {
        fetch.mockResponse(backendApiMock)
        // fetch.mockResponseOnce(JSON.stringify({ ok: true }))

        CodeRepository.create = jest.fn()

        await renderForm(
          async ({ projectUrlInput, usedApisInput, submitButton }) => {
            act(() => {
              fireEvent.change(projectUrlInput, {
                target: { value: 'https://www.gitlab.com/don/test-repo' },
              })
            })
            act(() => {
              fireEvent.click(projectUrlInput)
            })
            act(() => {
              fireEvent.keyDown(usedApisInput, { keyCode: 13 })
            })

            fireEvent.click(submitButton)
            console.log(screen.debug())
            expect(CodeRepository.create).toHaveBeenCalledWith('')
          },
        )
      })
    })
  })
})
