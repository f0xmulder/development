// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import {
  fireEvent,
  getByText,
  queryByTitle,
  renderWithProviders,
  screen,
  waitFor,
} from '../../../../test-helpers'
import APIDesignRulesPane from './APIDesignRulesPane'

const scores = {
  results: [
    {
      name: 'rule 1',
      description: 'description 1',
      url: 'http://designrules.com/1',
      success: true,
      errors: [],
    },
    {
      name: 'rule 2',
      description: 'description 2',
      url: 'http://designrules.com/2',
      success: false,
      errors: ['error 1', 'error 2'],
    },
  ],
}

const totalScore = {
  points: 1,
  maxPoints: 2,
}

const PARENT_URL = '/details/api-id'

const renderDefaultPane = () =>
  renderWithProviders(
    <APIDesignRulesPane
      designRuleScores={scores}
      totalScore={totalScore}
      parentUrl={PARENT_URL}
    />,
  )

describe('APIDesignRulesPane', () => {
  it('renders with 0 results', () => {
    const zeroScores = {
      results: [],
    }
    const zeroTotalScore = {
      points: 0,
      maxPoints: 0,
    }

    renderWithProviders(
      <APIDesignRulesPane
        designRuleScores={zeroScores}
        totalScore={zeroTotalScore}
        parentUrl={PARENT_URL}
      />,
    )

    expect(screen.getByTestId('design-rules-pane')).toBeTruthy()
  })

  it('renders all properties of the Design Rules', () => {
    renderDefaultPane()

    expect(screen.getByRole('list').children).toHaveLength(2)

    expect(screen.getByText('rule 1')).toBeTruthy()
    expect(screen.getByText('description 1')).toBeTruthy()
    expect(
      screen.getByRole('link', { name: /ga naar design rule rule 1/i }),
    ).toHaveAttribute('href', 'http://designrules.com/1')

    expect(screen.getByText('rule 2')).toBeTruthy()
    expect(screen.getByText('description 2')).toBeTruthy()
    expect(
      screen.getByRole('link', { name: /ga naar design rule rule 2/i }),
    ).toHaveAttribute('href', 'http://designrules.com/2')
  })

  it('renders no errors for a rule with 0 errors', () => {
    renderDefaultPane()

    const rule1 = screen.getAllByRole('listitem')[0]

    expect(queryByTitle(rule1, /bevinding(en)?/i)).toBeNull()
  })

  it('renders all errors in a collapsible, for a rule with errors', async () => {
    renderDefaultPane()

    const rule2 = screen.getAllByRole('listitem')[1]
    const errorsTitle = getByText(rule2, /bevindingen/i)
    expect(errorsTitle).toBeTruthy()

    fireEvent.click(errorsTitle)

    await waitFor(() => getByText(rule2, 'error 1'))

    expect(getByText(rule2, 'error 2')).toBeTruthy()
  })
})
