// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import SubmitCode from './SubmitCode'

test('contains the page title', () => {
  const wrapper = shallow(
    <SubmitCode
      match={{ url: 'https://gitlab.com/commonground/developer.overheid.nl' }}
    />,
  )
  expect(wrapper.find('h1').exists()).toBe(true)
})
