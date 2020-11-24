// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

import { Circle, StyledCheckmark } from './index.styles'

const CheckmarkCircle = ({ ...props }) => (
  <Circle size="30px" color="#CAFFE6" {...props}>
    <StyledCheckmark />
  </Circle>
)

export default CheckmarkCircle
