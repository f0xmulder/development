import React from 'react'
import { shallow } from 'enzyme'
import Tag from './index'

describe('Tag', () => {
  it('contains the page title including the tag', () => {
    const wrapper = shallow(<Tag match={({ params: { tag: 'dummy-tag' } })} />)
    expect(wrapper.find('h1').text()).toBe(`APIs for tag 'dummy-tag'`)
  })

  describe('on initialization', () => {
    it('should fetch the apis for the specified tag', () => {
      jest.spyOn(Tag.prototype, 'fetchApiList')

      const wrapper = shallow(<Tag match={({ params: { tag: 'dummy-tag' } })}/>)
      expect(wrapper.instance().fetchApiList).toHaveBeenCalledWith('dummy-tag')
    })
  })

  describe('loading the APIs', () => {
    it('should store the available apis as state', () => {
      const apiPromise = Promise.resolve([{test: 'test'}])
      Tag.prototype.fetchApiList = jest.fn(() => apiPromise)

      const wrapper = shallow(<Tag/>)
      return apiPromise
          .then(() => {
            expect(wrapper.state('apis')).toEqual([{ test: 'test'}])
          })
    })
  })

  describe('listing the available apis', () => {
    let listItems

    beforeEach(() => {
      const wrapper = shallow(<Tag/>)

      const apis = [{
        id: 'test-api.json',
        organization_name: 'Organization Name',
        service_name: 'Service Name'
      }]
      wrapper.setState({ apis, loaded: true })

      listItems = wrapper.find('ul li')
    })

    it('should show all available APIs', () => {
      expect(listItems.length).toBe(1)
    })

    describe('the API links', () => {
      let itemLink

      beforeAll(() => {
        const listItem = listItems.first()
        itemLink = listItem.find('[data-test="link"]')
      })

      it('should navigate to the API Detail page for the API', () => {
        expect(itemLink.props().to).toBe('/detail/test-api.json')
      })

      it('should show the organization name as label', () => {
        expect(itemLink.props().children).toEqual(['Service Name', ' - ', 'Organization Name'])
      })
    })
  })

  describe('when no apis are available', () => {
    it('should show a message saying no APIs are available yet', () => {
      const wrapper = shallow(<Tag match={({ params: { tag: 'dummy-tag' } })}/>)
      wrapper.setState({ apis: [], loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="no-apis-found-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
      expect(noApisMessageElement.text()).toBe(`No APIs found for tag 'dummy-tag'`)
    })
  })

  describe('when an error occurred while fetching the apis', () => {
    it('should set the error state', done => {
      const thePromise = Promise.reject('arbitrary reject reason coming from tests')
      Tag.prototype.fetchApiList = jest.fn(() => thePromise)

      const wrapper = shallow(<Tag />)

      return thePromise
          .catch(() => {
            expect(wrapper.state().error).toBe(true)
            done()
          })
    })
  })

  describe('when the component is in the error state', () => {
    it('an error message should be visible', () => {
      const wrapper = shallow(<Tag match={({ params: { tag: 'dummy-tag' } })}/>)
      wrapper.setState({ error: true, loaded: true })
      const noApisMessageElement = wrapper.find('[data-test="error-message"]')
      expect(noApisMessageElement.exists()).toBe(true)
      expect(noApisMessageElement.text()).toBe(`Failed loading the APIs for tag 'dummy-tag'`)
    })
  })
})
