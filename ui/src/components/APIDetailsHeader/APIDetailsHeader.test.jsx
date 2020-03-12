import React from 'react'
import { shallow } from 'enzyme'

import { H1, H2 } from '../Headings/Headings'
import APIDetailsHeader from './APIDetailsHeader'
import { BackButton } from './APIDetailsHeader.styles'

const details = {
  previousName: 'vorige',
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
    expect(backButton.text()).toBe(' Terug naar vorige')
  })

  it('should show the service as title', () => {
    const pageTitle = wrapper.find(H1)
    expect(pageTitle.text()).toBe('Service Name')
  })

  it('should show the organization name as subtitle', () => {
    const pageTitle = wrapper.find(H2)
    expect(pageTitle.text()).toBe('Organization Name')
  })
})
