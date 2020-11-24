// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

import { Circle, StyledCross } from './index.styles'

const CrossCircle = ({ ...props }) => (
  <Circle size="30px" color="#FFEAEC" {...props}>
    <StyledCross />
  </Circle>
)

export default CrossCircle
