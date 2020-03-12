import React from 'react'
import { shallow } from 'enzyme'
import Expandable from './Expandable'

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
