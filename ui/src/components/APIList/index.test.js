import { shallow } from 'enzyme/build'
import APIList from './index'
import React from 'react'

const TOTAL_SELECTOR = '[data-test="total"]'

describe('APIList', () => {
  let apiElements
  let wrapper

  beforeEach(() => {
    const apis = [
      {
        id: 'test-api.json',
        organizationName: 'Organization Name',
        serviceName: 'Service Name',
      },
    ]

    wrapper = shallow(<APIList total={1} apis={apis} />)
    apiElements = wrapper.find('Body Row')
  })

  it("should show the total amount of API's available", () => {
    wrapper.setProps({
      total: 42,
    })
    expect(wrapper.find(TOTAL_SELECTOR).text()).toEqual('42')
  })

  it('should show all available APIs', () => {
    expect(apiElements).toHaveLength(1)
  })

  it('should link to the API', () => {
    const link = apiElements.find('Styled(LinkToAPI)')
    expect(link.exists()).toBe(true)
  })
})
