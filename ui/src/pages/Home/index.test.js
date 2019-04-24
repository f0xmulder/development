import React from 'react'
import {shallow, mount} from 'enzyme'
import Search from './index'

const historyPush = jest.fn()

describe('Search', () => {
  it('contains the page title', () => {
    const wrapper = shallow(<Search/>)
    expect(wrapper.find('h1').text()).toBe('Een incompleet overzicht van alle API’s binnen de Nederlandse overheid')
  })

  describe('when submitting the form', () => {
    it('should call the onSubmit handler', () => {
      const onSubmitSpy = jest.spyOn(Search.prototype, 'onSubmit')
      const wrapper = mount(<Search history={{ push: jest.fn() }} />)
      const searchForm = wrapper.find('[data-test="search-form"]')
      searchForm.simulate('submit', { preventDefault: () => {} })

      expect(onSubmitSpy).toHaveBeenCalled()
    })
  })

  describe('the onSubmit hander', () => {
      it('should navigate to the overview page with the specified query', () => {
        const wrapper = mount(<Search history={{ push: jest.fn() }} />)
        wrapper.setState({ searchInputValue: "42" })

        wrapper.instance().onSubmit({
          preventDefault: () => {} 
        })

        expect(wrapper.props().history.push).toHaveBeenCalledWith(`/overzicht?q=42`)
    })
  })
})
