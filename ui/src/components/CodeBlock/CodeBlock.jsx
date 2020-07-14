// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useState } from 'react'
import { node } from 'prop-types'

import { ReactComponent as ClipboardIcon } from '../Icons/clipboard-icon.svg'
import copy from './copy'
import { StyledPre, StyledCopyButton, StyledFeedback } from './CodeBlock.styles'

const CodeBlock = ({ children, ...props }) => {
  const [feedback, setFeedback] = useState(null)

  return (
    <StyledPre {...props}>
      {children}
      <StyledCopyButton
        onClick={() => copy(children, setFeedback)}
        data-test="copy-button"
        aria-label="Kopiëren"
      >
        {feedback && <StyledFeedback>{feedback}</StyledFeedback>}
        <ClipboardIcon />
      </StyledCopyButton>
    </StyledPre>
  )
}

CodeBlock.propTypes = {
  children: node,
}

export default CodeBlock
