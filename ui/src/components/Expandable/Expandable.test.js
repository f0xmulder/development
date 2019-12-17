import React from 'react'
import Expandable from './Expandable'
import { shallow } from 'enzyme'

describe('Expandable', () => {
  it('should contain its children', () => {
    const wrapper = shallow(
      <Expandable>
        <p>Content</p>
      </Expandable>,
    )

    const contentElement = wrapper.find('[data-test="content"]')
    expect(contentElement.children().html()).toEqual('<p>Content</p>')
  })
})
