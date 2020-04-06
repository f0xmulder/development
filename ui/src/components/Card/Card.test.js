// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import Card from './Card'

describe('Card', () => {
  it('should exist', () => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <Card />
      </ThemeProvider>,
    )
    expect(wrapper.exists()).toBe(true)
  })
})
