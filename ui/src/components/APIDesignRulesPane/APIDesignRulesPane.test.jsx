// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { StaticRouter as Router, Route } from 'react-router-dom'

import { renderWithProviders } from '../../test-helpers'
import APIDesignRulesPane from './APIDesignRulesPane'

test('should render the API Design Rules Pane and fetch the api details', async () => {
  const getApiDetailsByIdSpy = jest.fn().mockResolvedValue({})

  renderWithProviders(
    <Router location="/details/api-id/api-design-rules">
      <Route path="/details/:id/api-design-rules">
        <APIDesignRulesPane
          getApiDetailsById={getApiDetailsByIdSpy}
          parentUrl="/details/api-id"
        />
      </Route>
    </Router>,
  )

  expect(getApiDetailsByIdSpy).toHaveBeenCalledWith('api-id')
})
