import React from 'react'
import {shallow} from 'enzyme/build'
import TopBar from './index'

describe('the TopBar', () => {
    let navigation

    beforeAll(() => {
        const wrapper = shallow(<TopBar/>)
        navigation = wrapper.find('Styled(Navigation)')
    })

    it('should contain a link to the Overview page', () => {
        const homeLink = navigation.childAt(0).find('Link')
        expect(homeLink.props().children).toBe('Overzicht')
        expect(homeLink.props().to).toBe('/overzicht')
    })

    it('should contain a link to the Submit API page', () => {
        const homeLink = navigation.childAt(1).find('Link')
        expect(homeLink.props().children).toBe('API toevoegen')
        expect(homeLink.props().to).toBe('/api-toevoegen')
    })

    it('should contain a link to the About page', () => {
        const homeLink = navigation.childAt(2).find('Link')
        expect(homeLink.props().children).toBe('Over')
        expect(homeLink.props().to).toBe('/over')
    })
})
