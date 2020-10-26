// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { shallow } from 'enzyme'
import React from 'react'
import { ResultsHeader } from './Overview'

const TOTAL_SELECTOR = '[data-test="total"]'
const LINK_SELECTOR = 'Styled(Button)'

describe('ResultsHeader', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <ResultsHeader
        objectName="Cactus"
        objectNamePlural="Cacti"
        addLinkTarget="/add/some/cacti"
      />,
    )
  })

  it('should show the add link', () => {
    wrapper.setProps({ totalResults: 0 })
    expect(wrapper.find(LINK_SELECTOR).exists()).toBe(true)
  })

  it('should show only the add link when there are no results', () => {
    wrapper.setProps({ totalResults: 0 })

    expect(wrapper.find(TOTAL_SELECTOR).exists()).toBe(false)
    expect(wrapper.find(LINK_SELECTOR).exists()).toBe(true)
  })

  it('should show the total with the single name for a single result', () => {
    wrapper.setProps({ totalResults: 1 })
    expect(wrapper.find(TOTAL_SELECTOR).text()).toEqual('1 Cactus')
  })

  it('should show the total with the plural name for multiple results', () => {
    wrapper.setProps({ totalResults: 42 })
    expect(wrapper.find(TOTAL_SELECTOR).text()).toEqual('42 Cacti')
  })
})
