import React from 'react'
import {shallow} from 'enzyme'
import TagListContainer from './index'

const dummyTag = 'tag-a'

describe('TagListContainer', () => {
    describe('on initialization', () => {
        it('should fetch the tags', () => {
            jest.spyOn(TagListContainer.prototype, 'fetchTagList')

            const wrapper = shallow(<TagListContainer />)
            expect(wrapper.instance().fetchTagList).toHaveBeenCalled()
        })
    })

    describe('loading the tags', () => {
        it('should store the available tags as state', () => {
            const apiPromise = Promise.resolve([dummyTag])
            TagListContainer.prototype.fetchTagList = jest.fn(() => apiPromise)

            const wrapper = shallow(<TagListContainer/>)
            return apiPromise
                .then(() => {
                    expect(wrapper.state('tags')).toEqual([dummyTag])
                })
        })
    })

    describe('listing the available tags', () => {
        let tagList

        beforeEach(() => {
            const wrapper = shallow(<TagListContainer/>)
            wrapper.setState({tags: [dummyTag], loaded: true})
            tagList = wrapper.find('TagList')
        })

        it('should show the list of APIs', () => {
            expect(tagList.exists()).toBe(true)
        })
    })

    describe('when no tags are available', () => {
        it('should show a message saying no tags are available yet', () => {
            const wrapper = shallow(<TagListContainer />)
            wrapper.setState({tags: [], loaded: true})
            const noTagsMessageElement = wrapper.find('[data-test="no-tags-available-message"]')
            expect(noTagsMessageElement.exists()).toBe(true)
        })
    })

    describe('when an error occurred while fetching the tags', () => {
        it('should set the error state', done => {
            const thePromise = Promise.reject('arbitrary reject reason coming from tests')
            TagListContainer.prototype.fetchTagList = jest.fn(() => thePromise)

            const wrapper = shallow(<TagListContainer/>)

            return thePromise
                .catch(() => {
                    expect(wrapper.state().error).toBe(true)
                    done()
                })
        })
    })

    describe('when the component is in the error state', () => {
        it('an error message should be visible', () => {
            const wrapper = shallow(<TagListContainer />)
            wrapper.setState({error: true, loaded: true})
            const noTagsMessageElement = wrapper.find('[data-test="error-message"]')
            expect(noTagsMessageElement.exists()).toBe(true)
        })
    })
})
