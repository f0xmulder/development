import React from 'react'
import {shallow} from 'enzyme'
import LinkToAPIContainer from './index'

const dummyAPI = {
    id: '42',
    service_name: 'Service',
    organization_name: 'Organization'
}

describe('LinkToAPIContainer', () => {
    describe('on initialization', () => {
        it('should fetch the API details', () => {
            jest.spyOn(LinkToAPIContainer.prototype, 'fetchAPIDetails')

            const wrapper = shallow(<LinkToAPIContainer id={'42'} />)
            expect(wrapper.instance().fetchAPIDetails).toHaveBeenCalled()
        })
    })

    describe('loading the API', () => {
        it('should store the details as state', () => {
            const apiPromise = Promise.resolve(dummyAPI)
            LinkToAPIContainer.prototype.fetchAPIDetails = jest.fn(() => apiPromise)

            const wrapper = shallow(<LinkToAPIContainer id={'42'}/>)
            return apiPromise
                .then(() => {
                    expect(wrapper.state('details')).toEqual(dummyAPI)
                })
        })
    })

    describe('displaying the API', () => {
        let wrapper

        beforeEach(() => {
            wrapper = shallow(<LinkToAPIContainer id={'42'}/>)
            wrapper.setState({details: dummyAPI, loaded: true})
        })

        it('should show the list of APIs', () => {
            expect(wrapper.find('Link').exists()).toBe(true)
        })

        it('should link to the API detail page', () => {
            const link = wrapper.find('Link')
            expect(link.props().to).toBe('/detail/42')
        })

        it('should display the service and organization name as link text', () => {
            const homeLink = wrapper.find('Link')
            expect(homeLink.props().children).toEqual(['Service', ' - ',  'Organization'])
        })
    })

    describe('when an error occurred while fetching the API', () => {
        it('should set the error state', done => {
            const thePromise = Promise.reject('arbitrary reject reason coming from tests')
            LinkToAPIContainer.prototype.fetchAPIDetails = jest.fn(() => thePromise)

            const wrapper = shallow(<LinkToAPIContainer id={'42'}/>)

            return thePromise
                .catch(() => {
                    expect(wrapper.state().error).toBe(true)
                    done()
                })
        })
    })

    describe('when the component is in the error state', () => {
        it('an error message should be visible', () => {
            const wrapper = shallow(<LinkToAPIContainer id={'42'} />)
            wrapper.setState({error: true, loaded: true})
            const noTagsMessageElement = wrapper.find('[data-test="error-message"]')
            expect(noTagsMessageElement.exists()).toBe(true)
        })
    })
})
