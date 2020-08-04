// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import SubmitEvent from './SubmitEvent'

test('contains the page title', () => {
  const wrapper = shallow(<SubmitEvent match={{ url: 'https://don.nl' }} />)
  expect(wrapper.find('h1').exists()).toBe(true)
})
