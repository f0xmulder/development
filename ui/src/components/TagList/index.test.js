import React from 'react'
import {shallow} from 'enzyme/build'
import TagList from './index'

describe('TagList', () => {
    let listItems

    beforeEach(() => {
        const tags = ['tag-a', 'tag-b']
        const wrapper = shallow(<TagList tags={tags}/>)
        listItems = wrapper.find('ul li')
    })

    it('should show all tags', () => {
        expect(listItems.length).toBe(2)
    })

    describe('the tag links', () => {
        let itemLink

        beforeAll(() => {
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
