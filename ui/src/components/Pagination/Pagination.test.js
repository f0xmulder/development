// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme/build'
import Pagination, { calculatePages } from './Pagination'
import { StyledArrowButton } from './Pagination.styles'

describe('Pagination', () => {
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
        />,
      )
      const nextButton = wrapper.find(StyledArrowButton).last()
      nextButton.simulate('click')
      expect(onPageChangedHandler).toHaveBeenCalledWith(2)
    })
  })
})
