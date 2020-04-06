// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { StyledContent, StyledToggleButton } from './Expandable.styles'

const Expandable = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <StyledContent isExpanded={isExpanded} data-test="content">
        {children}
      </StyledContent>

      <StyledToggleButton
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        {isExpanded ? '- Minder opties' : '+ Alle opties'}
      </StyledToggleButton>
    </>
  )
}

Expandable.propTypes = {
  children: PropTypes.node,
}

export default Expandable
