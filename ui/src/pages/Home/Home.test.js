import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'
import HomePage from '../../components/HomePage/HomePage'
import { flushPromises } from '../../test-helpers'

const apisResponseObject = {
  total: 42,
}

describe('Home', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('on initialization', () => {
    it('should not render anything', () => {
      const wrapper = shallow(<Home />)
      expect(wrapper.isEmptyRender()).toBe(true)
    })

    it('should load the amount of APIs', () => {
      jest.spyOn(Home.prototype, 'loadAmountOfAPIs')

      const wrapper = shallow(<Home />)
      expect(wrapper.instance().loadAmountOfAPIs).toHaveBeenCalled()
    })
  })

  describe('loading the amount of APIs', () => {
    let wrapper

    beforeEach(() => {
      const fetchAPIsPromise = Promise.resolve(apisResponseObject)
      Home.prototype.fetchAPIs = jest.fn(() => fetchAPIsPromise)

      wrapper = shallow(<Home />)
      return flushPromises()
    })

    it('should store the amount of APIs as state', () => {
      expect(wrapper.state('amountOfAPIs')).toEqual(42)
    })

    it('should show the HomePage and pass the amount of APIs', () => {
      expect(wrapper.is(HomePage)).toEqual(true)
    })
  })
})
