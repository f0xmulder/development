// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'

import theme from '../../../theme'
import ForumPost from '../ForumPost'

describe('ForumPost', () => {
  it('should properly construct post url', () => {
    const props = {
      url: 'https://discourse.forum/c/',
      title: 'post',
      lastPostedAt: 'Thu Jan 16 2020 15:38:39 GMT+0100',
      postsCount: 3,
      slug: 'post-slug',
    }

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ForumPost {...props} />
      </ThemeProvider>,
    )

    expect(wrapper.find('a').prop('href')).toBe(
      'https://discourse.forum/t/post-slug',
    )
  })
})
