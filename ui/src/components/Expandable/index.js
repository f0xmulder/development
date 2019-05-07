import React, { useState } from 'react'
import {StyledContent,StyledToggleButton} from './index.styles'

const Expandable = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <StyledContent isExpanded={isExpanded} data-test="content">
        {children}
      </StyledContent>

      <StyledToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        {
          isExpanded ?
            '- Minder opties' : 
            '+ Toon alle'
        }
      </StyledToggleButton>
    </div>
  )
}

export default Expandable

