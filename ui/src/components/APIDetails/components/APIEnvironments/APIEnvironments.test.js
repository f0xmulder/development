import React from 'react'
import { shallow } from 'enzyme'

import APIEnvironments from './APIEnvironments'

const singleEnvironment = {
  name: 'Productie',
  apiUrl: 'API URL',
  specificationUrl: 'Specification URL',
  documentationUrl: 'Documentation URL',
}

const multipleEnvironments = [
  {
    name: 'Productie',
    apiUrl: 'API URL',
    specificationUrl: 'Specification URL',
    documentationUrl: 'Documentation URL',
  },
  {
    name: 'Acceptance',
    apiUrl: 'API URL',
    specificationUrl: 'Specification URL',
    documentationUrl: 'Documentation URL',
  },
  {
    name: 'Demo',
    apiUrl: 'API URL',
    specificationUrl: 'Specification URL',
    documentationUrl: 'Documentation URL',
  },
]

it('should render single environment', () => {
  const wrapper = shallow(
    <APIEnvironments apiId="single-env" environments={[singleEnvironment]} />,
  )

  expect(wrapper.find('[data-test="apiUrl"]')).toHaveLength(1)
  expect(wrapper.find('[data-test="api-specification-url"]')).toHaveLength(1)
  expect(wrapper.find('[data-test="api-documentation-url"]')).toHaveLength(1)
})

it('should render a disabled button when specification url is not provided', () => {
  const environment = { ...singleEnvironment }
  delete environment.specificationUrl

  const wrapper = shallow(
    <APIEnvironments apiId="single-env" environments={[environment]} />,
  )

  expect(
    wrapper.find('[data-test="api-specification-url"]').props().disabled,
  ).toBe(true)
  expect(
    wrapper.find('[data-test="api-documentation-url"]').props().disabled,
  ).toBe(false)
})

it('should render a disabled button when documentation url is not provided', () => {
  const environment = { ...singleEnvironment }
  delete environment.documentationUrl

  const wrapper = shallow(
    <APIEnvironments apiId="single-env" environments={[environment]} />,
  )

  expect(
    wrapper.find('[data-test="api-documentation-url"]').props().disabled,
  ).toBe(true)
  expect(
    wrapper.find('[data-test="api-specification-url"]').props().disabled,
  ).toBe(false)
})

it('should render multiple environments', () => {
  const wrapper = shallow(
    <APIEnvironments
      apiId="multiple-env"
      environments={multipleEnvironments}
    />,
  )

  expect(wrapper.find('[data-test="apiUrl"]')).toHaveLength(3)
  expect(wrapper.find('[data-test="api-specification-url"]')).toHaveLength(3)
  expect(wrapper.find('[data-test="api-documentation-url"]')).toHaveLength(3)
})
