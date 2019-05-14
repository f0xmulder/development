import React, { Fragment, useState } from 'react'
import { StyledContent, StyledToggleButton } from './index.styles'

const Expandable = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Fragment>
      <StyledContent isExpanded={isExpanded} data-test="content">
        {children}
      </StyledContent>

      <StyledToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '- Minder opties' : '+ Alle opties'}
      </StyledToggleButton>
    </Fragment>
  )
}

export default Expandable
