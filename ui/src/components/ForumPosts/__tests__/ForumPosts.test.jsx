// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { ThemeProvider } from 'styled-components'

import theme from '../../../theme'
import * as forumFunctions from '../forumFunctions/fetchForumPosts'
import ForumPosts from '../ForumPosts'

jest.mock('../ForumPostsView', () => () => <p>posts view</p>)

const forum = {
  vendor: 'discourse',
  url: 'http://link.api',
}

describe('ForumPosts', () => {
  beforeEach(() => {
    // This is needed to suppress error caused by enzyme not properly supporting setState updates in useEffect
    global.console.error = jest.fn()
  })

  it('should fetch forum posts and pass them to child', async () => {
    const posts = [{ id: 1, title: 'my test post' }]

    const spy = jest
      .spyOn(forumFunctions, 'default')
      .mockResolvedValueOnce(posts)

    await act(() =>
      mount(
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <ForumPosts forum={forum} />
          </ThemeProvider>
        </MemoryRouter>,
      ),
    )

    expect(spy).toHaveBeenCalled()
  })
})
