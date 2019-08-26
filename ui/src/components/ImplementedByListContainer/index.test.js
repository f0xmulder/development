import React from 'react'
import { shallow } from 'enzyme'
import ImplementedByListContainer from './index'
import { modelFromAPIResponse } from '../../models/api'
import { flushPromises } from '../../test-helpers'

/* eslint-disable camelcase */
const apiFromAPIResponse = {}
apiFromAPIResponse.id = '1'
apiFromAPIResponse.service_name = 'service'
apiFromAPIResponse.organization_name = 'organization'
/* eslint-enable camelcase */

describe('ImplementedByListContainer', () => {
  describe('on initialization', () => {
    it('should fetch the implementedBy info', () => {
      jest.spyOn(ImplementedByListContainer.prototype, 'fetchImplementedByInfo')

      const wrapper = shallow(<ImplementedByListContainer id={'42'} />)
      expect(wrapper.instance().fetchImplementedByInfo).toHaveBeenCalled()
    })
  })

  describe('loading the tags', () => {
    it("should store the implemented by API's as state", () => {
      const apiPromise = Promise.resolve([apiFromAPIResponse])
      ImplementedByListContainer.prototype.fetchImplementedByInfo = jest.fn(
        () => apiPromise,
      )

      const wrapper = shallow(<ImplementedByListContainer id={'42'} />)

      return flushPromises().then(() => {
        expect(wrapper.state('apis')).toEqual([
          modelFromAPIResponse(apiFromAPIResponse),
        ])
      })
    })
  })

  describe("listing the API's", () => {
    let apiList

    beforeEach(() => {
      const wrapper = shallow(<ImplementedByListContainer id={'42'} />)
      wrapper.setState({
        apis: [modelFromAPIResponse(apiFromAPIResponse)],
        loaded: true,
      })
      apiList = wrapper.find('ImplementedByList')
    })

    it('should show the list of APIs', () => {
      expect(apiList.exists()).toBe(true)
    })
  })

  describe('when the API is not implemented by another API', () => {
    it('should be empty', () => {
      const wrapper = shallow(<ImplementedByListContainer id={'42'} />)
      wrapper.setState({ apis: [], loaded: true })
      expect(wrapper.children().exists()).toBe(false)
    })
  })

  describe("when an error occurred while fetching the API's", () => {
    it('should set the error state', () => {
      const thePromise = Promise.reject(
        new Error('arbitrary reject reason coming from tests'),
      )
      ImplementedByListContainer.prototype.fetchImplementedByInfo = jest.fn(
        () => thePromise,
      )

      const wrapper = shallow(<ImplementedByListContainer id={'42'} />)

      return flushPromises().then(() => {
        expect(wrapper.state().error).toBe(true)
      })
    })
  })

  describe('when the component is in the error state', () => {
    it('an error message should be visible', () => {
      const wrapper = shallow(<ImplementedByListContainer id={'42'} />)
      wrapper.setState({ error: true, loaded: true })
      const noTagsMessageElement = wrapper.find('[data-test="error-message"]')
      expect(noTagsMessageElement.exists()).toBe(true)
    })
  })
})
