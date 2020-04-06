// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'

import showFeedback from './showFeedback'
// Used in order to spy on copy
import * as copy from './copy'
import CodeBlock from './CodeBlock'

describe('showFeedback function', () => {
  jest.useFakeTimers()

  it('fires feedback function', () => {
    const feedback = 'hi'
    const feedbackFn = jest.fn()

    showFeedback(feedback, feedbackFn)
    expect(feedbackFn).toHaveBeenCalledWith('hi')
  })

  it('fires feedback function with `null` after 2500ms timeout', async () => {
    const feedback = 'hi'
    const feedbackFn = jest.fn()

    showFeedback(feedback, feedbackFn)

    jest.advanceTimersByTime(2500)

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2500)
    expect(feedbackFn).toHaveBeenLastCalledWith(null)
  })
})

describe('copy function', () => {
  it('shows an error when we can not copy (JSDOM LIMITATION)', () => {
    const errorMock = jest.fn()
    console.error = errorMock

    const copyString = 'copied!'
    const feedbackFn = jest.fn()

    // Default export needed because of spy in other test
    copy.default(copyString, feedbackFn)

    expect(errorMock).toHaveBeenCalled()
    expect(feedbackFn).toHaveBeenCalledWith('Niet gelukt')
  })
})

describe('CodeBlock', () => {
  it('renders', () => {
    const text = 'copy me'
    const wrapper = shallow(<CodeBlock>{text}</CodeBlock>)

    expect(wrapper.text()).toContain(text)
    expect(wrapper.find('[data-test="copy-button"]')).toHaveLength(1)
  })

  it('fires copy function on click button', () => {
    const text = 'copy me'
    const wrapper = shallow(<CodeBlock>{text}</CodeBlock>)
    const copySpy = jest.spyOn(copy, 'default')

    console.error = jest.fn()
    wrapper.find('[data-test="copy-button"]').simulate('click')
    expect(copySpy).toHaveBeenCalledWith(text, expect.any(Function))
  })
})
