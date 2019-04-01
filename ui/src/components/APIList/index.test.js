import {shallow} from "enzyme/build";
import APIList from "./index"
import React from "react";

describe('APIList', () => {
    let listItems

    beforeEach(() => {
        const apis = [{
            id: 'test-api.json',
            organization_name: 'Organization Name',
            service_name: 'Service Name'
        }]
        const wrapper = shallow(<APIList apis={apis}/>)
        listItems = wrapper.find('ul li')
    })

    it('should show all available APIs', () => {
        expect(listItems.length).toBe(1)
    })

    it('should link to the API', () => {
        const link = listItems.childAt(0).find('LinkToAPI')
        expect(link.exists()).toBe(true)
    })
})
