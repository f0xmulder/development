import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import Pane from './index'

describe('Pane', () => {
  let utils

  beforeEach(() => {
    jest.useFakeTimers()

    utils = render(
      <Router>
        <Pane parentUrl="/componenten">My First Pane</Pane>
      </Router>,
    )
  })

  it('should have a background which is clickable and links to the parentUrl', () => {
    fireEvent.click(utils.getByTestId('background'))
    jest.runAllTimers()
    expect(window.location.pathname).toBe('/componenten')
  })

  it('should render the children as part of the content section', () => {
    expect(utils.getByTestId('content')).toHaveTextContent('My First Pane')
  })

  it('should show a close button linking to the parentUrl', () => {
    utils.rerender(
      <Router>
        <Pane parentUrl="/producten">My First Pane</Pane>
      </Router>,
    )

    fireEvent.click(utils.getByTestId('close-button'))
    jest.runAllTimers()
    expect(window.location.pathname).toBe('/producten')
  })

  describe('pressing escape', () => {
    const ESCAPE_KEY_CODE = 27

    it('should close the pane and navigate to the parentUrl', async () => {
      fireEvent.keyDown(global.document, {
        keyCode: ESCAPE_KEY_CODE,
      })

      jest.runAllTimers()

      expect(window.location.pathname).toBe('/componenten')
    })
  })
})
