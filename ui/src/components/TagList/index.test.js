import React from 'react'
import { shallow } from 'enzyme/build'
import TagList from './index'

describe('TagList', () => {
  let wrapper
  let listItems
  const LIST_ITEMS_SELECTOR = 'ul li'

  beforeEach(() => {
    wrapper = shallow(<TagList />)
  })

  it('should exist', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should list all provided tags', () => {
    wrapper.setProps({
      tags: ['tag-a', 'tag-b'],
    })
    listItems = wrapper.find(LIST_ITEMS_SELECTOR)
    expect(listItems).toHaveLength(2)
  })

  it('should not fail to render if the profided tags are null', () => {
    wrapper.setProps({
      tags: null,
    })
    expect(wrapper.exists()).toBe(true)
  })

  describe('the tag links', () => {
    let itemLink

    beforeAll(() => {
      wrapper.setProps({
        tags: ['tag-a', 'tag-b'],
      })
      listItems = wrapper.find(LIST_ITEMS_SELECTOR)

      const listItem = listItems.first()
      itemLink = listItem.find('[data-test="link"]')
    })

    it('should navigate to the tag Detail page for that tag', () => {
      expect(itemLink.props().to).toBe('/overzicht?tags=tag-a')
    })

    it('should show the tag as label', () => {
      expect(itemLink.props().children).toEqual('tag-a')
    })
  })
})
