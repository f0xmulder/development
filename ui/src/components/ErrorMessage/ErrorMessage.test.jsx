import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'

import theme from '../../theme'
import ErrorMessage from './ErrorMessage'

describe('ForumPosts', () => {
  it('should show a message', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ErrorMessage>Some error</ErrorMessage>
      </ThemeProvider>,
    )

    expect(wrapper.text()).toBe('Some error')
  })

  it('should render null if no message given', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ErrorMessage />
      </ThemeProvider>,
    )

    expect(wrapper.isEmptyRender()).toBe(true)
  })
})
