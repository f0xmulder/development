import React from 'react'
import APIFilter from './index'
import { shallow } from 'enzyme/build'

describe('APIFilter', () => {
  it('should show its heading', () => {
    const wrapper = shallow(
      <APIFilter
        title="the title"
        name="MyFilter"
        options={[]}
        value={[]}
      />
    )

    expect(wrapper.find('h2').text()).toEqual('the title')
  })
})
