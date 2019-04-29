import {shallow} from "enzyme/build";
import APIList from "./index"
import React from "react";

describe('APIList', () => {
    let apiElements

    beforeEach(() => {
        const apis = [{
            id: 'test-api.json',
            organization_name: 'Organization Name',
            service_name: 'Service Name'
        }]
        const wrapper = shallow(<APIList apis={apis}/>)
        apiElements = wrapper.find('Body Row')
    })

    it('should show all available APIs', () => {
        expect(apiElements.length).toBe(1)
    })

    it('should link to the API', () => {
        const link = apiElements.find('Styled(LinkToAPI)')
        expect(link.exists()).toBe(true)
    })
})
