import React from 'react'
import { shallow } from 'enzyme'
import APIDetail from './index'

it('contains the page title', () => {
  const wrapper = shallow(<APIDetail/>)
  expect(wrapper.find('h1').text()).toBe('API details')
})

describe('on initialization', () => {
  it('should fetch the API details', () => {
    jest.spyOn(APIDetail.prototype, 'fetchApiDetails')

    const wrapper = shallow(<APIDetail match={({ params: { id: '42' } })}/>)
    expect(wrapper.instance().fetchApiDetails).toHaveBeenCalledWith('42')
  })
})

describe('loading the API details', () => {
  it('should store the API info as state', () => {
    const apiPromise = Promise.resolve([{test: 'test'}])
    APIDetail.prototype.fetchApiDetails = jest.fn(() => apiPromise)

    const wrapper = shallow(<APIDetail/>)
    return apiPromise
        .then(() => {
          expect(wrapper.state('details')).toEqual([{ test: 'test'}])
        })
  })
})

describe('the API details', () => {
  let organizationName

  beforeEach(() => {
    const wrapper = shallow(<APIDetail/>)

    const details = { organization_name: 'Test' }
    wrapper.setState({ details, loaded: true })

    organizationName = wrapper.find('[data-test="organization-name"]')
  })

  it('should show the organization name', () => {
    expect(organizationName.text()).toBe('Test')
  })
})

describe('when an error occurred while fetching the apis', () => {
  it('should set the error state', done => {
    const thePromise = Promise.reject('arbitrary reject reason coming from tests')
    APIDetail.prototype.fetchApiDetails = jest.fn(() => thePromise)

    const wrapper = shallow(<APIDetail />)

    return thePromise
        .catch(() => {
          expect(wrapper.state().error).toBe(true)
          done()
        })
  })
})

describe('when the component is in the error state', () => {
  it('an error message should be visible', () => {
    const wrapper = shallow(<APIDetail />)
    wrapper.setState({ error: true, loaded: true })
    const noApisMessageElement = wrapper.find('[data-test="error-message"]')
    expect(noApisMessageElement.exists()).toBe(true)
    expect(noApisMessageElement.text()).toBe('Failed loading the API details')
  })
})
