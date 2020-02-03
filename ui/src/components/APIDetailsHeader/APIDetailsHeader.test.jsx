import React from 'react'
import { shallow } from 'enzyme'

import APIDetailsHeader from './APIDetailsHeader'
import { BackButton, PageTitle, SubTitle } from './APIDetailsHeader.styles'

const details = {
  organizationName: 'Organization Name',
  serviceName: 'Service Name',
}

describe('APIDetailsHeader', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<APIDetailsHeader.WrappedComponent {...details} />)
  })

  it('should show the back button', () => {
    const backButton = wrapper.find(BackButton)
    expect(backButton.text()).toBe(' Vorige')
  })

  it('should show the service as title', () => {
    const pageTitle = wrapper.find(PageTitle)
    expect(pageTitle.text()).toBe('Service Name')
  })

  it('should show the organization name as subtitle', () => {
    const pageTitle = wrapper.find(SubTitle)
    expect(pageTitle.text()).toBe('Organization Name')
  })
})
