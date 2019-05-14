import React from 'react'
import { shallow } from 'enzyme'
import APIDetails, { referenceImplementationsFromRelations } from './index'
import { PageTitle, SubTitle } from './index.styles'

const details = {
  description: 'Description',
  organizationName: 'Organization Name',
  serviceName: 'Service Name',
  apiUrl: 'API URL',
  apiType: 'API Type',
  specificationUrl: 'Specification URL',
  documentationUrl: 'Documentation URL',
  badges: ['Golden API', 'Well-written docs'],
  termsOfUse: {
    governmentOnly: true,
    payPerUse: false,
    uptimeGuarantee: 99.9,
    supportResponseTime: '2 days',
  },
  scores: {
    hasDocumentation: true,
    hasSpecification: false,
    hasContactDetails: false,
    providesSla: false,
  },
}

describe('referenceImplementationsFromRelations', () => {
  it('should return the API ids for its reference implementations', () => {
    const result = referenceImplementationsFromRelations({
      'an-api': ['reference-implementation'],
      'another-api': [],
    })

    expect(result).toEqual(['an-api'])
  })
})

describe('APIDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<APIDetails {...details} />)
  })

  it('should show the service as title', () => {
    const pageTitle = wrapper.find(PageTitle)
    expect(pageTitle.text()).toBe('Service Name')
  })

  it('should show the organization name as subtitle', () => {
    const pageTitle = wrapper.find(SubTitle)
    expect(pageTitle.text()).toBe('Organization Name')
  })

  it('should show the description', () => {
    const description = wrapper.find('p')
    expect(description.text()).toBe('Description')
  })

  it('should show the API URL', () => {
    const apiURL = wrapper.find('[data-test="api-url"]')
    expect(apiURL.text()).toBe('API URL')
  })

  describe('api type', () => {
    it('should show the api type', () => {
      const apiSpecType = wrapper.find('[data-test="api-type"]')
      expect(apiSpecType.text()).toBe('API Type')
    })

    it('should link to Rebilly with the specification URL', () => {
      const apiSpecUrl = wrapper.find('[data-test="api-specification-url"]')
      expect(apiSpecUrl.prop('href')).toBe(
        'https://rebilly.github.io/ReDoc/?url=Specification%20URL',
      )
    })
  })

  describe('documentation', () => {
    it('should show a link to the documentation url', () => {
      const documentationUrl = wrapper.find(
        '[data-test="api-documentation-url"]',
      )
      expect(documentationUrl.text()).toBe('Lees meer')
    })

    it('should link to the documentation URL', () => {
      const apiSpecUrl = wrapper.find('[data-test="api-documentation-url"] a')
      expect(apiSpecUrl.prop('href')).toBe('Documentation URL')
    })
  })

  describe('badges', () => {
    let badgesTitle
    let badges

    beforeEach(() => {
      badgesTitle = wrapper.find('[data-test="badges-title"]')
      badges = wrapper.find('[data-test="badges"]')
    })

    it('should show the badges title', () => {
      expect(badgesTitle.exists()).toBe(true)
      expect(badgesTitle.text()).toBe('Badges')
    })

    it('should display every badge', () => {
      expect(badges.children()).toHaveLength(2)
    })

    describe('when the API has no badges', () => {
      beforeEach(() => {
        wrapper.setProps({ badges: null })

        badgesTitle = wrapper.find('[data-test="badges-title"]')
        badges = wrapper.find('[data-test="badges"]')
      })

      it('should hide the badges title', () => {
        expect(badgesTitle.exists()).toBe(false)
      })

      it('should hide the badges element', () => {
        expect(badges.exists()).toBe(false)
      })
    })
  })

  describe('terms of use', () => {
    it('should display the terms of use', () => {
      const termsOfUse = wrapper.find('[data-test="api-terms-of-use"]')
      expect(termsOfUse.exists()).toBe(true)
    })
  })

  describe('scores', () => {
    it('should display the scores', () => {
      const scores = wrapper.find('[data-test="api-scores"]')
      expect(scores.exists()).toBe(true)
    })
  })
})
