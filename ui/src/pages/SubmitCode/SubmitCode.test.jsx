// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'
import { GITLAB_REPO_URL } from '../../constants'
import SubmitCode from './SubmitCode'

test('contains the page title', () => {
  const wrapper = shallow(<SubmitCode match={{ url: GITLAB_REPO_URL }} />)
  expect(wrapper.find('h1').exists()).toBe(true)
})
