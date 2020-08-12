// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'

import { H1, H2 } from '../Headings/Headings'
import APIDetailsHeader, {
  getExternalSpecificationDescription,
} from './APIDetailsHeader'
import { BackButton, SpecLink } from './APIDetailsHeader.styles'

const details = {
  previousName: 'vorige',
  organizationName: 'Organization Name',
  serviceName: 'Service Name',
  externalSpecificationUrl: 'https://example.com/spec.yml',
}

describe('getExternalSpecifictionDescription', () => {
  it('should return YAML for a .yml file', () => {
    const actual = getExternalSpecificationDescription(
      'https://example.com/spec.yml',
    )
    expect(actual).toBe('Originele specificatie (YAML)')
  })

  it('should return YAML for a .yaml file', () => {
    const actual = getExternalSpecificationDescription(
      'https://example.com/spec.yaml',
    )
    expect(actual).toBe('Originele specificatie (YAML)')
  })

  it('should return JSON for a .json file', () => {
    const actual = getExternalSpecificationDescription(
      'https://example.com/spec.json',
    )
    expect(actual).toBe('Originele specificatie (JSON)')
  })

  it('should not specify the type if it has no extension', () => {
    const actual = getExternalSpecificationDescription(
      'https://example.com/spec',
    )
    expect(actual).toBe('Originele specificatie')
  })

  it('should not specify the type if it has an unrecognized extension', () => {
    const actual = getExternalSpecificationDescription(
      'https://example.com/spec.html',
    )
    expect(actual).toBe('Originele specificatie')
  })
})

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

  it('should show a link to the external specification file', () => {
    const specLink = wrapper.find(SpecLink)
    expect(specLink.prop('href')).toBe('https://example.com/spec.yml')
    expect(specLink.text()).toContain('Originele specificatie (YAML)')
  })
})
