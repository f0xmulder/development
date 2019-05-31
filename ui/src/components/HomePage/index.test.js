import React from 'react'
import { shallow } from 'enzyme'
import Home from './index'
import { PageTitle, SubTitle } from './index.styles'

describe('HomePage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Home amountOfAPIs={1} />)
  })

  it('contains the page title', () => {
    expect(wrapper.find(PageTitle).text()).toBe('developer.overheid.nl')
  })

  describe('the page description', () => {
    it("should include the amount of API's", () => {
      expect(wrapper.find(SubTitle).text()).toBe(
        'Een overzicht van 1 API’s binnen de Nederlandse overheid.',
      )

      wrapper.setProps({
        amountOfAPIs: 42,
      })
      expect(wrapper.find(SubTitle).text()).toBe(
        'Een overzicht van 42 API’s binnen de Nederlandse overheid.',
      )
    })
  })
})
