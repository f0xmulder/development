import React from 'react'
import {shallow} from 'enzyme/build'
import ImplementedByList from './index'

describe('ImplementedByList', () => {
    let wrapper

    beforeAll(() => {
        const apis = [
            {
                id: '42',
                service_name: 'Service',
                organization_name: 'Organization'
            }
        ]
        wrapper = shallow(<ImplementedByList apis={apis}/>)
    })

    it('should list all provided apis', () => {
        const listItems = wrapper.find('li')
        expect(listItems.length).toBe(1)
    })

    it('should link to the API', () => {
        const link = wrapper.find('ul li').childAt(0).find('LinkToAPI')
        expect(link.exists()).toBe(true)
    })
})
