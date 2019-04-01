import {shallow} from "enzyme/build";
import {Link} from 'react-router-dom';
import LinkToAPI from "./index"
import React from "react";

describe('LinkToAPI', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<LinkToAPI id={'test-api.json'}
                                           organization_name={'Organization'}
                                           service_name={'Service'}/>)
    })

    it('should show a Link', () => {
        expect(wrapper.type()).toBe(Link)
    })

    it('should link to the API detail page', () => {
        expect(wrapper.props().to).toBe('/detail/test-api.json')
    })

    it('should display the service and organization name as link text', () => {
        expect(wrapper.props().children).toEqual(['Service', ' - ',  'Organization'])
    })
})
