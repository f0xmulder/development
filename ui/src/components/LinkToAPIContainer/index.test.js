import React from 'react'
import { shallow } from 'enzyme'
import LinkToAPIContainer from './index'
import { modelFromAPIResponse } from '../../models/api'
import { flushPromises } from '../../test-helpers'

const apiFromAPIResponse = {}
apiFromAPIResponse['id'] = '42'
apiFromAPIResponse['service_name'] = 'Service'
apiFromAPIResponse['organization_name'] = 'Organization'

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
      const apiPromise = Promise.resolve(apiFromAPIResponse)
      LinkToAPIContainer.prototype.fetchAPIDetails = jest.fn(() => apiPromise)

      const wrapper = shallow(<LinkToAPIContainer id={'42'} />)

      return flushPromises().then(() => {
        expect(wrapper.state('details')).toEqual(
          modelFromAPIResponse(apiFromAPIResponse),
        )
      })
    })
  })

  describe('displaying the API', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<LinkToAPIContainer id={'42'} />)
      wrapper.setState({
        details: modelFromAPIResponse(apiFromAPIResponse),
        loaded: true,
      })
    })

    it('should show the LinkToAPI', () => {
      expect(wrapper.find('LinkToAPI').exists()).toBe(true)
    })
  })

  describe('when an error occurred while fetching the API', () => {
    it('should set the error state', () => {
      const thePromise = Promise.reject(
        new Error('arbitrary reject reason coming from tests'),
      )
      LinkToAPIContainer.prototype.fetchAPIDetails = jest.fn(() => thePromise)

      const wrapper = shallow(<LinkToAPIContainer id={'42'} />)

      return flushPromises().then(() => {
        expect(wrapper.state().error).toBe(true)
      })
    })
  })

  describe('when the component is in the error state', () => {
    it('an error message should be visible', () => {
      const wrapper = shallow(<LinkToAPIContainer id={'42'} />)
      wrapper.setState({ error: true, loaded: true })
      const noTagsMessageElement = wrapper.find('[data-test="error-message"]')
      expect(noTagsMessageElement.exists()).toBe(true)
    })
  })
})
