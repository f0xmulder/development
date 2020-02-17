import React from 'react'
import { render } from '@testing-library/react'
import { StaticRouter as Router, Route } from 'react-router-dom'

import APIDesignRulesPane from './APIDesignRulesPane'

it('should render the API Design Rules Pane and fetch the api details', async () => {
  const getApiDetailsByIdSpy = jest.fn().mockResolvedValue({})

  render(
    <Router location="/details/api-id/api-design-rules">
      <Route path="/details/:id/api-design-rules">
        <APIDesignRulesPane getApiDetailsById={getApiDetailsByIdSpy} />
      </Route>
    </Router>,
  )

  expect(getApiDetailsByIdSpy).toHaveBeenCalledWith('api-id')
})
