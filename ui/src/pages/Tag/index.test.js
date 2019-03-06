import React from 'react'
import {shallow} from 'enzyme'
import Tag from './index'
import APIDetail from "../APIDetail/index.test";

const dummyAPI = {
    id: 'test-api.json',
    organization_name: 'Organization Name',
    service_name: 'Service Name'
}

describe('Tag', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('contains the page title including the tag', () => {
        const wrapper = shallow(<Tag match={({params: {tag: 'dummy-tag'}})}/>)
        expect(wrapper.find('h1').text()).toBe(`APIs for tag 'dummy-tag'`)
    })

    describe('on initialization', () => {
        it('should fetch the apis for the specified tag', () => {
            jest.spyOn(Tag.prototype, 'fetchApiList')

            const wrapper = shallow(<Tag match={({params: {tag: 'dummy-tag'}})}/>)
            expect(wrapper.instance().fetchApiList).toHaveBeenCalledWith('dummy-tag')
        })
    })

    describe('when the provided tag changes', () => {
        it(`should re-fetch the tag API's`, () => {
            jest.spyOn(Tag.prototype, 'fetchApiList')

            const wrapper = shallow(<Tag match={({ params: { tag: 'dummy-tag-a' } })}/>)
            wrapper.setProps({match: {params: { tag: 'dummy-tag-b' }}})
            expect(wrapper.instance().fetchApiList).toHaveBeenNthCalledWith(1, 'dummy-tag-a')
            expect(wrapper.instance().fetchApiList).toHaveBeenNthCalledWith(2, 'dummy-tag-b')
        })
    })

    describe('loading the APIs', () => {
        it('should store the available apis as state', () => {
            const apiPromise = Promise.resolve([dummyAPI])
            Tag.prototype.fetchApiList = jest.fn(() => apiPromise)

            const wrapper = shallow(<Tag/>)
            return apiPromise
                .then(() => {
                    expect(wrapper.state('apis')).toEqual([dummyAPI])
                })
        })
    })

    describe('listing the available apis', () => {
        let apiList

        beforeEach(() => {
            const wrapper = shallow(<Tag/>)
            wrapper.setState({apis: [dummyAPI], loaded: true})
            apiList = wrapper.find('APIList')
        })

        it('should show the list of APIs', () => {
            expect(apiList.exists()).toBe(true)
        })
    })

    describe('when no apis are available', () => {
        it('should show a message saying no APIs are available yet', () => {
            const wrapper = shallow(<Tag match={({params: {tag: 'dummy-tag'}})}/>)
            wrapper.setState({apis: [], loaded: true})
            const noApisMessageElement = wrapper.find('[data-test="no-apis-found-message"]')
            expect(noApisMessageElement.exists()).toBe(true)
            expect(noApisMessageElement.text()).toBe(`No APIs found for tag 'dummy-tag'`)
        })
    })

    describe('when an error occurred while fetching the apis', () => {
        it('should set the error state', done => {
            const thePromise = Promise.reject('arbitrary reject reason coming from tests')
            Tag.prototype.fetchApiList = jest.fn(() => thePromise)

            const wrapper = shallow(<Tag/>)

            return thePromise
                .catch(() => {
                    expect(wrapper.state().error).toBe(true)
                    done()
                })
        })
    })

    describe('when the component is in the error state', () => {
        it('an error message should be visible', () => {
            const wrapper = shallow(<Tag match={({params: {tag: 'dummy-tag'}})}/>)
            wrapper.setState({error: true, loaded: true})
            const noApisMessageElement = wrapper.find('[data-test="error-message"]')
            expect(noApisMessageElement.exists()).toBe(true)
            expect(noApisMessageElement.text()).toBe(`Failed loading the APIs for tag 'dummy-tag'`)
        })
    })
})
