import React from 'react'
import {shallow} from 'enzyme'
import ImplementedByListContainer from './index'

const dummyAPI = {
    id: '1',
    service_name: 'service',
    organization_name: 'organization'
}

describe('ImplementedByListContainer', () => {
    describe('on initialization', () => {
        it('should fetch the implementedBy info', () => {
            jest.spyOn(ImplementedByListContainer.prototype, 'fetchImplementedByInfo')

            const wrapper = shallow(<ImplementedByListContainer id={'42'} />)
            expect(wrapper.instance().fetchImplementedByInfo).toHaveBeenCalled()
        })
    })

    describe('loading the tags', () => {
        it('should store the implemented by API\'s as state', () => {
            const apiPromise = Promise.resolve([dummyAPI])
            ImplementedByListContainer.prototype.fetchImplementedByInfo = jest.fn(() => apiPromise)

            const wrapper = shallow(<ImplementedByListContainer id={'42'}/>)
            return apiPromise
                .then(() => {
                    expect(wrapper.state('apis')).toEqual([dummyAPI])
                })
        })
    })

    describe('listing the API\'s', () => {
        let apiList

        beforeEach(() => {
            const wrapper = shallow(<ImplementedByListContainer id={'42'}/>)
            wrapper.setState({apis: [dummyAPI], loaded: true})
            apiList = wrapper.find('ImplementedByList')
        })

        it('should show the list of APIs', () => {
            expect(apiList.exists()).toBe(true)
        })
    })

    describe('when the API is not implemented by another API', () => {
        it('should be empty', () => {
            const wrapper = shallow(<ImplementedByListContainer id={'42'} />)
            wrapper.setState({apis: [], loaded: true})
            expect(wrapper.children().exists()).toBe(false)
        })
    })

    describe('when an error occurred while fetching the API\'s', () => {
        it('should set the error state', done => {
            const thePromise = Promise.reject('arbitrary reject reason coming from tests')
            ImplementedByListContainer.prototype.fetchImplementedByInfo = jest.fn(() => thePromise)

            const wrapper = shallow(<ImplementedByListContainer id={'42'}/>)

            return thePromise
                .catch(() => {
                    expect(wrapper.state().error).toBe(true)
                    done()
                })
        })
    })

    describe('when the component is in the error state', () => {
        it('an error message should be visible', () => {
            const wrapper = shallow(<ImplementedByListContainer id={'42'} />)
            wrapper.setState({error: true, loaded: true})
            const noTagsMessageElement = wrapper.find('[data-test="error-message"]')
            expect(noTagsMessageElement.exists()).toBe(true)
        })
    })
})
