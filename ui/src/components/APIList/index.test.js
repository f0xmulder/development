import {shallow} from "enzyme/build";
import APIList from "./index"
import React from "react";

describe('APIList', () => {
    describe('listing the available apis', () => {
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

        describe('the API links', () => {
            let itemLink

            beforeAll(() => {
                const listItem = listItems.first()
                itemLink = listItem.find('[data-test="link"]')
            })

            it('should navigate to the API Detail page for the API', () => {
                expect(itemLink.props().to).toBe('/detail/test-api.json')
            })

            it('should show the organization name as label', () => {
                expect(itemLink.props().children).toEqual(['Service Name', ' - ', 'Organization Name'])
            })
        })
    })
})
