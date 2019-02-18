import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

it('contains the page title', () => {
  const wrapper = shallow(<App/>)
  expect(wrapper.find('h1').text()).toBe('API overview')
})

describe('on initialization', () => {
  it('should fetch the available apis', () => {
    jest.spyOn(App.prototype, 'fetchApiList')

    const wrapper = shallow(<App/>)
    expect(wrapper.instance().fetchApiList).toHaveBeenCalled()
  })

  it('should store the available apis as state', () => {
    const apiPromise = Promise.resolve([{test: 'test'}])
    App.prototype.fetchApiList = jest.fn(() => apiPromise)

    const wrapper = shallow(<App/>)
    return apiPromise
        .then(() => {
          expect(wrapper.state('apis')).toEqual([{ test: 'test'}])
        })
  })
})

describe('listing the available apis', () => {
  let listItems

  beforeEach(() => {
    const wrapper = shallow(<App/>)

    const apis = [{ organization_name: 'Test' }]
    wrapper.setState({ apis })

    listItems = wrapper.find('ul li')
  })

  it('should show all available APIs', () => {
    expect(listItems.length).toBe(1)
  })

  it('should show the organization name as label', () => {
    expect(listItems.first().text()).toBe('Test')
  })
})
