import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import Search from './index'

describe('Search', () => {
  describe('changing the text input value', () => {
    it('should call the onQueryChanged handler with the query', async () => {
      expect.assertions(1)

      const onQueryChangedSpy = jest.fn()

      const { findByPlaceholderText } = render(
        <Search
          onQueryChanged={onQueryChangedSpy}
          inputProps={{ placeholder: 'Zoek' }}
        />,
      )

      await wait(async () => {
        const inputField = await findByPlaceholderText('Zoek')

        fireEvent.change(inputField, { target: { value: 'abc' } })
        expect(onQueryChangedSpy).toHaveBeenCalledWith('abc')
      })
    })
  })
})
