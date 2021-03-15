// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme/build'
import userEvent from '@testing-library/user-event'
import { act, screen, SetupTest } from '../../test-helpers'
import Pagination, { calculatePages } from './Pagination'
import { StyledArrowButton } from './Pagination.styles'

describe('Pagination', () => {
  const scrollTo = window.scrollTo
  beforeEach(() => {
    window.scrollTo = jest.fn()
  })
  afterEach(() => {
    window.scrollTo = scrollTo
  })

  it('should calculate the correct page buttons', () => {
    const testCases = [
      /* eslint-disable */
      [1, 2, [1, 2]],                           // [1] {2}
      [2, 2, [1, 2]],                           // {1} [2]
      [1, 10, [1, 2, '...', 10]],               // [1] {2 ... 10}
      [2, 10, [1, 2, 3, '...', 10]],            // {1} [2] {3 ... 10}
      [3, 10, [1, 2, 3, 4, '...', 10]],         // {1 2} [3] {4 ... 10}
      [4, 10, [1, '...', 3, 4, 5, '...', 10]],  // {1 ... 3} [4] {5 ... 10}
      [8, 10, [1, '...', 7, 8, 9, 10]],         // {1 ... 7} [8] {9 10}
      [9, 10, [1, '...', 8, 9, 10]],            // {1 ... 8} [9] {10}
      [10, 10, [1, '...', 9, 10]],              // {1 ... 9} [10]
      /* eslint-enable */
    ]

    testCases.forEach((t) => {
      const pages = calculatePages(t[0], t[1])

      expect(pages).toEqual(t[2])
    })
  })

  describe('clicking the previous page button', () => {
    it('should trigger the onPageChangedHandler function', () => {
      const onPageChangedHandler = jest.fn()
      const wrapper = shallow(
        <Pagination
          currentPage={2}
          totalRows={25}
          rowsPerPage={10}
          onPageChangedHandler={onPageChangedHandler}
          onResultsPerPageChange={() => {}}
        />,
      )
      const previousButton = wrapper.find(StyledArrowButton).first()
      previousButton.simulate('click')
      expect(onPageChangedHandler).toHaveBeenCalledWith(1)
    })
  })

  describe('clicking the next page button', () => {
    it('should trigger the onPageChangedHandler function', () => {
      const onPageChangedHandler = jest.fn()
      const wrapper = shallow(
        <Pagination
          currentPage={1}
          totalRows={25}
          rowsPerPage={10}
          onPageChangedHandler={onPageChangedHandler}
          onResultsPerPageChange={() => {}}
        />,
      )
      const nextButton = wrapper.find(StyledArrowButton).last()
      nextButton.simulate('click')
      expect(onPageChangedHandler).toHaveBeenCalledWith(2)
    })
  })

  it('should scroll to the top of the pages after changing pages', () => {
    const wrapper = shallow(
      <Pagination
        currentPage={1}
        totalRows={25}
        rowsPerPage={10}
        onPageChangedHandler={() => {}}
        onResultsPerPageChange={() => {}}
      />,
    )
    const nextButton = wrapper.find(StyledArrowButton).last()
    nextButton.simulate('click')
    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      left: 0,
      top: 0,
    })
  })

  describe('Results per page', () => {
    const onResultsPerPageChange = jest.fn()

    const { setup } = new SetupTest(
      (
        <Pagination
          currentPage={1}
          totalRows={25}
          rowsPerPage={10}
          onPageChangedHandler={() => {}}
          onResultsPerPageChange={onResultsPerPageChange}
        />
      ),
    )

    it('should show results per page', async () => {
      await setup({
        assert: () => {
          expect(
            screen.getByRole('combobox', {
              name: /Aantal resultaten per pagina/,
            }),
          ).toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })

    it('should handle results per page', async () => {
      await setup({
        assert: () => {
          const resultsPerPage = screen.getByRole('combobox', {
            name: /Aantal resultaten per pagina/,
          })

          act(() => {
            userEvent.selectOptions(resultsPerPage, ['25'])
          })
          expect(onResultsPerPageChange).toHaveBeenCalledWith('25')
          act(() => {
            userEvent.selectOptions(resultsPerPage, ['10'])
          })
          expect(onResultsPerPageChange).toHaveBeenCalledWith('10')
        },
        ignoreLoadingState: false,
      })
    })

    it('should only show the first option when there are not enough results', async () => {
      await setup({
        additionalProps: {
          currentPage: 1,
          totalRows: 1,
          rowsPerPage: 1,
        },
        assert: () => {
          const tenPerPage = screen.getByRole('option', {
            name: /10/,
          })
          expect(tenPerPage).toBeInTheDocument()

          const twentyFivePerPage = screen.queryByRole('option', {
            name: /25/,
          })
          expect(twentyFivePerPage).not.toBeInTheDocument()
        },
        ignoreLoadingState: false,
      })
    })
  })
})
