import React from 'react'
import {shallow} from 'enzyme'
import APIDetails from './APIDetails'

const details = {
    "description": "Description",
    "organization_name": "Organization Name",
    "service_name": "Service Name",
    "api_url": "API URL",
    "api_specification_type": "Specification Type",
    "specification_url": "Specification URL",
    "documentation_url": "Documentation URL",
    "badges": ["Golden API", "Well-written docs"]
}

const detailsWithoutBadges = () =>
    Object.assign({}, details, { badges: null })

describe('APIDetails', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<APIDetails details={details}/>)
    })

    it('should show the service & organization name as page title', () => {
        const pageTitle = wrapper.find('h1')
        expect(pageTitle.text()).toBe('Service Name - Organization Name')
    })

    it('should show the description', () => {
        const description = wrapper.find('p')
        expect(description.text()).toBe('Description')
    })

    it('should show the API URL', () => {
        const apiURL = wrapper.find('[data-test="api-url"]')
        expect(apiURL.text()).toBe('API URL')
    })

    it('should show the specification type', () => {
        const apiSpecType = wrapper.find('[data-test="api-specification-type"]')
        expect(apiSpecType.text()).toBe('Specification Type')
    })

    it('should show the specification URL', () => {
        const apiSpecUrl = wrapper.find('[data-test="api-specification-url"]')
        expect(apiSpecUrl.text()).toBe('Specification URL')
    })

    it('should show the documentation url', () => {
        const documentationUrl = wrapper.find('[data-test="api-documentation-url"]')
        expect(documentationUrl.text()).toBe('Documentation URL')
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
            expect(badges.children().length).toBe(2)
        })

        describe('when the API has no badges', () => {
            beforeEach(() => {
                wrapper.setProps({ details: detailsWithoutBadges() })

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
})