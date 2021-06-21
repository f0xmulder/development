// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { renderWithProviders, cleanup } from '../../test-helpers'
import CodeExamples from './CodeExamples'

const relatedCode = [
  {
    id: 9,
    owner_name: 'PDOK',
    name: 'data.labs.pdok.nl',
    url: 'https://github.com/PDOK/data.labs.pdok.nl',
    last_change: '2019-12-13T09:56:21+01:00',
    stars: 11,
    source: 'GitHub repository',
    programming_languages: [
      'Python',
      'HTML',
      'CSS',
      'JavaScript',
      'Shell',
      'Ruby',
    ],
  },
  {
    id: 3,
    owner_name: 'GemeenteUtrecht',
    name: 'BInG',
    url: 'https://gitlab.com/GemeenteUtrecht/BInG',
    last_change: '2020-03-13T11:28:20+01:00',
    stars: 0,
    source: 'GitLab repository',
    programming_languages: [
      'Python',
      'HTML',
      'CSS',
      'JavaScript',
      'Shell',
      'Dockerfile',
      'TSQL',
    ],
  },
]

describe('CodeExamples', () => {
  afterEach(() => {
    cleanup()
    jest.useRealTimers()
  })

  it('renders without crashing', () => {
    const { getByTestId } = renderWithProviders(
      <CodeExamples relatedCode={[]} />,
    )
    expect(getByTestId('code-examples')).toHaveTextContent('Code')
  })

  describe('Projects using this API', () => {
    it('should should the correct text with a single project', () => {
      const { getByTestId } = renderWithProviders(
        <CodeExamples relatedCode={[relatedCode[0]]} />,
      )
      expect(getByTestId('code-examples')).toHaveTextContent(
        '1 open source project gebruikt deze API',
      )
    })

    it('should should the correct text with multiple projects', () => {
      const { getByTestId } = renderWithProviders(
        <CodeExamples relatedCode={relatedCode} />,
      )
      expect(getByTestId('code-examples')).toHaveTextContent(
        '2 open source projecten gebruiken deze API',
      )
    })
  })

  describe('List', () => {
    it('should show a list of code examples', () => {
      const { queryAllByTestId } = renderWithProviders(
        <CodeExamples relatedCode={relatedCode} />,
      )
      expect(queryAllByTestId('code-example')).toHaveLength(2)
    })
  })

  describe('CodeExample', () => {
    let gitHubExample
    let gitLabExample

    beforeEach(() => {
      const { queryAllByTestId } = renderWithProviders(
        <CodeExamples relatedCode={relatedCode} />,
      )
      gitHubExample = queryAllByTestId('code-example')[0]
      gitLabExample = queryAllByTestId('code-example')[1]
    })

    it('should have the title', () => {
      expect(gitHubExample).toHaveTextContent('data.labs.pdok.nl')
    })
    it('should have the number of stars', () => {
      expect(gitHubExample).toHaveTextContent('11')
    })
    it('should have the last commit date', () => {
      expect(gitHubExample).toHaveTextContent('jaar geleden')
    })
    it('should have the used code languages', () => {
      expect(gitHubExample).toHaveTextContent(
        'PythonHTMLCSSJavaScriptShellRuby',
      )
    })
    it('should link to the project', () => {
      expect(gitHubExample).toHaveAttribute(
        'href',
        'https://github.com/PDOK/data.labs.pdok.nl',
      )
    })

    describe('Repo icon', () => {
      it('should show a GitHub icon when on GH', () => {
        expect(gitHubExample).toHaveTextContent('GitHub')
      })
      it('should show a GitLab icon when on GL', () => {
        expect(gitLabExample).toHaveTextContent('GitLab')
      })
    })
  })
})
